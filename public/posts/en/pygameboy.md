---
title: PyGameBoy - Making Python Pass The Cartridge Test
description: PyGameBoy began as an experiment in making a Game Boy emulator fast enough in CPython. It became a study in proving that the assembled machine behaves like the hardware.
tags: [emulation, python, performance, software, architecture, testing]
---

An emulator can be fast, thoroughly unit-tested, and completely wrong. [PyGameBoy](https://github.com/Obscuretone/pygameboy "emulation, python, software | PyGameBoy on GitHub") began as an experiment in making a readable Game Boy emulator practical in CPython; it became a more interesting exercise when the tests started arriving as cartridges.

The original challenge has not disappeared. The DMG-01 runs its processor at roughly [4.194304 MHz](https://gbdev.io/pandocs/Specifications.html "emulation, hardware, performance | Pan Docs technical specifications"), which is leisurely for modern hardware but awkward for an interpreter doing several pieces of work for every emulated cycle. Function calls, dynamic lookups, temporary objects, and per-pixel Python loops become expensive when they sit inside the part of the machine that never stops running.

Performance only answers whether the emulator can keep up, though. It does not answer whether a timer overflow happened on the right cycle, whether a DMA transfer blocked the right memory access, or whether an instruction changed a flag exactly as the hardware would. A convincing emulator has to satisfy both questions at once.

## A Complete Machine, With Deliberate Gaps

PyGameBoy emulates the original monochrome Game Boy rather than treating "Game Boy" as a promise to reproduce every model Nintendo eventually shipped. It has a complete legal LR35902 base-opcode dispatch, interrupts and timers, MBC0, MBC1, MBC2, MBC3, and MBC5 cartridge support, background and window rendering, sprites, joypad input, serial behavior, battery-backed saves, and all four audio channels.

Those components share one timing model. A ROM reaches the CPU through a cartridge controller and memory bus; instructions advance the timer, PPU, APU, interrupts, and serial link; the resulting frame reaches Pygame while generated samples flow into a host audio buffer. Optional boot-ROM support can run the original startup sequence when the user supplies firmware, while the normal path starts from documented post-boot hardware state.

The boundaries are equally important. The PPU is scanline based rather than a dot-accurate pixel FIFO. The MBC3 real-time clock does not run yet, channel 1 still lacks frequency sweep, external serial clocking needs a link-cable peer, and the emulator does not claim Game Boy Color support. The current [architecture and accuracy roadmap](https://github.com/Obscuretone/pygameboy/blob/main/ARCHITECTURE.md "emulation, architecture, software | PyGameBoy architecture") records those limits beside the implementation instead of allowing a game that appears to work to imply perfect compatibility.

## Python Has A Cost Model

The central performance decision is a flat 64 KiB `bytearray`. Most reads, including instruction fetches, become direct indexes into one visible memory image:

```python
opcode = memory[registers.PC]
cycles = dispatch[opcode]()
```

Writes cannot be equally simple because an address may select a cartridge bank, mirror work RAM, start DMA, or alter a hardware register. PyGameBoy routes them through a 256-entry table selected by the high byte of the address. Cartridge callbacks then keep the visible ROM and external-RAM windows synchronized when the active bank changes.

This arrangement is less ceremonious than a graph of bus objects receiving messages from one another, but it matches the workload. The common read path remains cheap, while the writes that actually have side effects pay for the necessary behavior. Integration tests exercise banking through the full memory system because a cartridge controller can be correct in isolation while leaving the CPU's flat view stale.

The CPU follows the same principle. It builds a table of bound opcode methods once and dispatches through it directly. The fast loop caches frequently used objects and callables as local variables, while a slower public stepping path remains available for debugging, profiling, and instrumentation. Some hot operations are repeated rather than abstracted because CPython charges for elegance each time around the loop.

Rendering is hybrid rather than dogmatically vectorized. NumPy handles background and window scanlines, tile addressing, palette lookup, and sprite selection in bulk. The final sprite overlay uses small Python loops over the Game Boy's bounded set of visible sprites, where straightforward priority behavior is worth more than forcing every operation into an array expression.

The checked-in [CPU benchmarks](https://github.com/Obscuretone/pygameboy/blob/main/BENCHMARKS.md "emulation, python, performance | PyGameBoy CPU benchmarks") put isolated instruction mixes between 1.67 and 7.61 times the original DMG clock target on the measured machine. They are intentionally described as CPU microbenchmarks, not whole-emulator frame rates. A benchmark becomes useful evidence when it says what it excluded.

## Audio Paces The Host

Video can tolerate a repeated or skipped host frame. Audio announces timing mistakes immediately.

Inside the emulated machine, CPU cycle counts drive hardware time. Audio does not decide how long an instruction takes or when a timer advances. When a `sounddevice` stream is active and real-time mode is enabled, however, the audio queue becomes the host pacing signal.

PyGameBoy generates 44.1 kHz stereo samples into a fixed-size NumPy ring buffer. A deep buffer tells the CPU producer to wait, while a shallow one allows the emulator to skip host rendering and continue producing emulated time and audio. When audio is disabled, unavailable, or stops during execution, Pygame's frame clock becomes the real-time fallback. Disabling real-time mode disables both pacing strategies.

The APU now models the four-bit channel DACs as bipolar signals, applies the Game Boy's mixer gain and stereo routing, and carries the high-pass capacitor state forward at the sample cadence. Silence remains clocked when the APU is powered off, while a genuine host underrun is filled with zero rather than extending an old sample. The model is not cycle-perfect, but the ownership is clean: the emulator produces the waveform, and the callback drains it without quietly changing its shape.

Using buffer depth as feedback does not make host scheduling deterministic. It does prevent the CPU, display, and audio device from behaving like three clocks that merely hope to meet again later.

## Coverage Is Not Conformance

The project enforces 100 percent statement and branch coverage across production modules. Its [CI matrix](https://github.com/Obscuretone/pygameboy/blob/main/.github/workflows/ci.yml "emulation, testing, software | PyGameBoy CI workflow") runs on Python 3.10 through 3.13, applies Ruff's static checks, audits base-opcode coverage, exercises synthetic ROMs and hardware state machines, and validates the benchmark and reporting tools.

That is useful, but coverage can only prove that a Python path executed. It cannot prove that the path collectively behaved like a Game Boy.

Test ROMs reverse the relationship between the emulator and the test. Instead of a Python assertion reaching into an object and checking a convenient internal value, a small Game Boy program enters through the cartridge interface from the emulator's post-boot state, executes instructions, interacts with hardware, and reports success through registers, serial output, or documented memory locations. The test sees the same emulated hardware path a game sees.

PyGameBoy's [headless conformance runner](https://github.com/Obscuretone/pygameboy/blob/main/docs/conformance.md "emulation, testing, software | PyGameBoy conformance policy") understands the machine-readable conventions used by the [Mooneye Test Suite](https://github.com/Gekkio/mooneye-test-suite/tree/31510e12eea6286d36eea060a6adde755e1067aa "emulation, testing, hardware | Pinned Mooneye Test Suite") and [Blargg's Game Boy test ROMs](https://github.com/retrio/gb-test-roms/tree/c240dd7d700e5c0b00a7bbba52b53e4ee67b5f15 "emulation, testing, hardware | Pinned Blargg test ROMs"). It accepts individual ROMs or directories, bounds every execution by an instruction budget, and exits unsuccessfully if any selected ROM fails, times out, or cannot produce a valid result. That last property is what turns a compatibility experiment into a build gate.

## The Cartridge Test

Seven MIT-licensed Mooneye acceptance ROMs live in the repository and run inside `pytest` on every CI job. Their [fixture manifest](https://github.com/Obscuretone/pygameboy/blob/main/tests/roms/mooneye/README.md "emulation, testing, software | Vendored Mooneye fixture manifest") records the upstream revision, archive digest, individual checksums, and license. They cover flag-register invariants, decimal adjustment, OAM access, basic DMA, DMA register reads, reset-aligned serial timing, and timer frequency selection.

Each one travels through the real cartridge controller, memory bus, CPU, timer, PPU, APU, and serial components. Passing them means more than calling those components individually with friendly inputs. It means the assembled emulator reached the signature that a program written for the hardware expected to reach.

A [separate conformance workflow](https://github.com/Obscuretone/pygameboy/blob/main/.github/workflows/conformance.yml "emulation, testing, software | PyGameBoy conformance workflow") checks out that pinned Blargg revision and fails unless every ROM in a larger known-passing floor succeeds: the eleven individual CPU instruction groups, instruction timing, both memory-timing suites, an audio-register baseline, and two OAM behavior guardrails. The run produces JSON, Markdown, a badge payload, and a [public compatibility report](https://obscuretone.com/pygameboy/ "emulation, testing, software | PyGameBoy compatibility report") tied to the exact project commit and workflow.

The word **floor** matters. The bundled ROMs do not establish that every Mooneye or Blargg case passes. Broader OAM corruption behavior, scanline edge cases, and most of the audio suite remain diagnostic targets. They can be run through the same machinery, but they do not join the published green floor until the emulator earns them.

That policy keeps the dashboard from becoming theatre. A passing badge describes a precise, reproducible set of behavior, while the failures outside that set continue to define the work.

## What Changed

PyGameBoy is still a performance experiment, and CPython remains the constraint that gives its architecture a particular shape. Flat memory, pre-bound dispatch, vectorized scanlines, bounded Python loops, and audio-buffer pacing are all responses to that constraint.

The project became more defensible when those ideas stopped being the whole story. Microbenchmarks now state their scope. Hardware limits are documented. Test fixtures have provenance. CI runs across supported interpreters. Compatibility claims are generated from ROMs that execute against the complete system, and the unclaimed territory remains visible.

That is the difference between software that appears to work and software that can explain why anyone should believe it.
