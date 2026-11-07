---
title: Rewinding an Emulated CPU and Rebuilding the Screen
description: PyGameBoy reverses recorded hardware changes and replays a frame to reconstruct its pixels. The interesting work is deciding which state must survive, which output can be rebuilt, and how to prove the restored machine follows the same future.
published: "2026-11-07"
tags: [emulation, gameboy, python, architecture, testing, performance]
---

I added a rewind button to [PyGameBoy](https://github.com/Obscuretone/pygameboy/tree/9a3da91766ce816a614aafb70c3cebee7417a729 "emulation, python, software | PyGameBoy rewind implementation"). Hold R and the game moves backward through roughly ten seconds of history. Release it and play continues from the restored machine, with whatever buttons are held now. A small bar shows how much past remains.

The visible feature is simple. The implementation has to recover the processor, memory, cartridge controller, timers, display hardware and sound hardware together. The screen is rebuilt by executing the restored machine. There is no stored history of rendered frames.

![An original PyGameBoy demo ROM playing, rewinding, and continuing with different input](/images/pygameboy-rewind.gif)

The animation uses an original demonstration ROM running through the actual CPU and PPU. Its annotations expose the machine values changing underneath the movement. The backward section restores hardware and regenerates each displayed frame; the final section resumes with different input.

## CPU Instructions Lose Information

An emulated processor does not become reversible because its clock is a Python object.

Consider an instruction that loads zero into register A. The resulting A value tells us nothing about its previous contents. A write to RAM can destroy the same information. Interrupts, timer transitions and device register writes add more state changes around the instruction.

Some operations have useful inverses, but a universal reverse interpreter would still need to record the information that execution overwrote. Moving the clock backward would leave that information missing.

PyGameBoy records hardware transitions at frame boundaries. Rewind undoes those transitions. Instructions execute forward when reconstructing the display. That distinction gives the feature a precise boundary: frame-level hardware undo, with ordinary emulation used to recover its output.

## The Machine Is Larger Than Its Registers

Restoring the program counter is insufficient if the next instruction reads a different memory bank or an interrupt arrives in a different phase.

The [captured hardware state](https://github.com/Obscuretone/pygameboy/blob/9a3da91766ce816a614aafb70c3cebee7417a729/rewind.py "emulation, architecture, software | MachineHistory capture and replay") includes CPU registers and execution flags, the visible memory bus, backing cartridge RAM, bank selections, timer and serial phase, interrupt state, joypad state, PPU timing, and the APU's channels and filters. Color mode adds VRAM and WRAM banks, palette memory and DMA state. The cartridge clock has to travel with the rest of the machine too.

That state crosses several Python objects, some of which share storage. The CPU caches a reference to the flat memory array. The renderer holds NumPy views into that array and the physical VRAM banks. Replacing a bytearray during restoration could leave one device looking at the restored memory while another continues reading an abandoned allocation.

Restoration therefore copies mutable buffers in place and rebuilds the bus's write routing. Preserving the relationships between devices matters as much as preserving their bytes.

Host resources stay outside the history. A sound-device lock, a callback function and the physical keyboard are connections to the running application. They are not cartridge-visible machine state. Renderer caches, profiling totals and the host audio queue are excluded for the same reason.

## Store the Changes Between Hardware States

The straightforward implementation stores a compressed hardware image for every frame. It works, and I kept a full-state backend as a reference implementation. It also repeatedly stores memory that barely changes.

The default backend keeps one complete detached hardware state and compressed transitions to earlier states. Scalar metadata describes the preceding machine. Mutable buffers are handled separately, using their stable paths through the state structure as identifiers.

For a buffer that changed, the reverse transition contains its previous length and an XOR difference:

```text
delta    = previous XOR current
previous = current  XOR delta
```

Unchanged buffers need no payload in that transition. Changes concentrated in a few addresses produce long runs of zeroes, which compress well. The record also preserves enough structure to handle buffers appearing, disappearing or changing length.

Keeping buffers separate matters. Applying XOR to one large serialized object lets a small change in metadata shift the byte offsets of everything that follows it. An integer crossing an encoding boundary can make otherwise identical RAM appear completely different. Aligning the actual buffers avoids confusing serialization movement with hardware changes.

The [reverse-delta codec](https://github.com/Obscuretone/pygameboy/blob/9a3da91766ce816a614aafb70c3cebee7417a729/rewind_state.py "emulation, architecture, software | ReverseDeltaBuffer and full-state reference") has a simple direction: every retained transition converts a newer checkpoint into its predecessor. Removing the oldest transition shortens the available past without breaking the remaining chain. Popping transitions during rewind discards the future; recording again extends the surviving timeline.

The default limit is about 600 frame intervals and 64 MiB of retained payload. That byte limit includes the detached current state as well as compressed transitions. Python container headers and temporary allocations remain outside that accounting.

## Rebuild the Frame by Running the Hardware

Removing pixel history creates a harder requirement than redrawing the final contents of VRAM.

A program can change a palette or scroll register partway through a frame. Earlier scanlines were drawn with one value; later scanlines used another. At the end, the register contains only its final value. Rendering the whole screen from that final state loses the sequence that produced the image.

PyGameBoy records the hardware immediately before a frame runs, after the current input has been applied. It also records the execution budget and dispatch mode used for that run. Normal gameplay execution returns at VBlank, after the visible frame has been drawn.

The retained head is therefore the start of the most recently displayed frame, while the live CPU has already finished that frame. To move backward one displayed frame, rewind restores the preceding checkpoint and executes its recorded run again:

```text
restore earlier pre-frame hardware
                 |
                 v
execute the recorded frame normally
                 |
                 v
recover its resulting hardware and pixels
```

The PPU sees the same timed register changes and produces the same scanlines. The resulting CPU and peripheral state is ready to continue from the frame now on screen.

This costs a frame of emulation for each backward step. It also means display reconstruction benefits from the emulator's existing timing and rendering implementation instead of growing a second renderer that guesses what an old image should have looked like.

## LCD Off Exposed a Hidden Dependency

The first extended Pokémon Crystal check found a mismatch several seconds into rewind. The restored hardware matched exactly. Every pixel differed.

Crystal had disabled the LCD after leaving a white image on screen. The forward renderer retained those white pixels while the display was off. Reconstruction started with a cleared RGB buffer, whose zeroes were black. The discrepancy came from old host output surviving in one direction.

Both forward recording and replay now begin with the same blank display, using white RGB in Color mode. The background priority buffer is cleared too. LCD-off intervals no longer inherit an image from whichever timeline happened to run previously.

The same rule makes finite diagnostic runs predictable: an instruction or cycle limit can stop before a complete frame, so that partial run reconstructs only the pixels it actually draws. A manual hardware checkpoint without a replay recipe restores the machine with a blank display.

Removing stored pixels helped expose a dependency that had been hiding inside the renderer. The frame was supposed to be output, but stale output had become an undeclared input.

## Audio and External Effects Have Different Boundaries

The APU's oscillator, sequencer and filter state belongs to the emulated machine. Samples already queued for the host audio device do not. Rewind restores the former and clears the latter. A separate ten-second tape effect plays once per rewind gesture, replacing game audio while R is held.

Serial output needs similar care. Reconstructing a frame may reproduce a completed transfer inside the emulated hardware, but its host callback must not print the same byte again. Replay temporarily suppresses that callback and restores it even if execution fails.

Battery saves have another consequence. The restored cartridge RAM may differ from the last state written to disk, so restoration marks it dirty for the next normal save flush. MBC3's clock uses emulated time while history is attached, with frame-interval resolution. Offline elapsed time remains part of loading a persisted clock; wall time spent holding R does not advance the recorded machine.

These boundaries allow hardware to be restored without pretending that an external observer can forget a byte it already received.

## Verify the Past and the Resumed Future

The useful test goes beyond watching the character move backward.

The [benchmark harness](https://github.com/Obscuretone/pygameboy/blob/9a3da91766ce816a614aafb70c3cebee7417a729/tools/benchmark_rewind.py "emulation, testing, performance | Rewind comparison and replay verification") records digests of the original hardware and pixels, walks backward through retained history, compares every reconstructed result, and resumes forward with the original input sequence. Disk dirty flags are deliberately excluded from hardware comparisons because restoration changes that bookkeeping. Both storage backends use the same capture and reconstruction path.

In one local 900-frame Crystal workload, each backend retained 600 reverse transitions. All 600 backward frames and the subsequent 600 forward frames matched their originals. Their [retained payloads](https://github.com/Obscuretone/pygameboy/blob/9a3da91766ce816a614aafb70c3cebee7417a729/benchmarks/rewind-crystal-2026-11-07.json "emulation, testing, performance | Recorded Crystal rewind comparison") were:

| Hardware history | Retained payload |
|---|---:|
| Full compressed hardware states | 20,302,065 bytes |
| Compressed reverse deltas | 2,057,613 bytes |

That is approximately 90 percent less retained payload for this workload. It includes the current uncompressed hardware state and excludes Python container overhead, so it is not a process-memory measurement. A separate three-run comparison uses the redistributable original demo ROM; the Crystal ROM and save remain outside the repositories.

Reconstructing a Crystal frame took about 20 milliseconds locally. The memory saving does not remove that execution cost or establish 60-frame-per-second rewind. The project keeps those measurements separate from CPU microbenchmarks and hardware conformance claims.

Regression tests also exercise changing palettes and scrolling during scanlines, DMG and CGB output, both dispatch paths, banked memory, clock restoration, history eviction, branching, LCD-off frames, and suppressed serial callbacks. The complete local suite passed 1,379 tests with 100 percent statement and branch coverage. Five existing CGB conformance cases remain expected failures. Replaying the same emulator exactly establishes determinism across this feature; independent hardware tests still determine whether the emulator itself is accurate.

The small bar at the bottom of the game now represents a bounded chain of machine transitions. Releasing R leaves the processor, devices and memory at the selected point, ready to produce a different future. The screen follows because the restored hardware builds it again.
