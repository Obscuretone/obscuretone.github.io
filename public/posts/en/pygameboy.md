---
title: PyGameBoy - Writing A Game Boy Emulator In Python
description: A project note on PyGameBoy, a Python Game Boy emulator that uses flat memory, opcode dispatch tables, NumPy rendering, and audio-clock synchronization to reach real-time performance.
---

[PyGameBoy](https://github.com/Obscuretone/pygameboy) is a Game Boy emulator written in Python with Pygame and NumPy.

The interesting part is not simply that it emulates the original DMG-01 hardware. The interesting part is the constraint: getting real-time emulator performance out of CPython, where function calls, dynamic lookups, and object-heavy abstractions quickly become the bottleneck.

That makes the project a useful performance exercise. It is a small system where every abstraction has a cost, and the hardware being emulated is slow enough to understand but fast enough to punish careless design.

## What It Emulates

The emulator includes the major pieces expected from a Game Boy implementation:

1. **CPU:** LR35902 instruction execution with opcode dispatch.
2. **Memory:** support for common memory bank controllers.
3. **Video:** background, window, and sprite rendering.
4. **Audio:** pulse, wave, and noise channels.
5. **Input:** keyboard mapping through Pygame.
6. **Boot ROM support:** optional original DMG boot sequence support.

That means the project is not just a ROM loader or display demo. It crosses the boundary into system behavior: CPU, memory, video, audio, timing, and input all have to cooperate.

## The CPython Constraint

The original Game Boy CPU runs at about 4.19 MHz. In a native language, that is modest. In CPython, it is a real constraint because the emulator cannot afford millions of expensive Python-level abstractions per second.

An idiomatic emulator might route every memory access through methods such as `bus.read_byte(address)` or expose CPU registers through properties. That design is pleasant to read, but in Python it can be too slow for the hottest paths.

PyGameBoy responds by flattening the architecture where performance matters.

## Flat Memory

The memory subsystem uses a 64KB `bytearray` as a flattened memory map. Reads can become direct C-backed array access instead of Python method calls.

The tradeoff is that writes still need routing because writing to some address ranges triggers hardware behavior, such as bank switching or video state changes. To keep that cheaper, writes are routed through page-level handlers rather than a large conditional chain on every access.

That design pays complexity at the edges so the common path stays fast.

## Opcode Dispatch

The CPU uses a prebuilt dispatch table where each opcode indexes directly to its implementation.

The core shape is:

```python
cycles = dispatch[memory[program_counter]]()
```

That avoids a large `if` or `match` chain in the instruction loop. It also makes the performance profile easier to reason about: instruction fetch, table lookup, execute.

For emulator work, that kind of mechanical sympathy matters. The loop is small, but it runs constantly.

## Rendering With NumPy

Pixel rendering is another place where pure Python loops are expensive. A Game Boy frame is small by modern standards, but calculating background tiles, scrolling, palettes, sprites, and priority per pixel can still dominate runtime if each pixel is handled individually in Python.

PyGameBoy uses NumPy to move scanline work into vectorized operations. Background and window pixels can be resolved in bulk, sprite intersections can be found with array operations, and the resulting palette indices can be mapped to RGB values before being pushed through Pygame.

The larger lesson is that Python performance often comes from choosing which work stays in Python and which work is expressed as bulk operations in C-backed libraries.

## Audio As The Clock

Emulators need stable timing. Sleeping the main thread for `1/60` of a second is simple, but operating-system scheduling can drift, and audio drift becomes audible quickly.

PyGameBoy uses the audio buffer as the practical timing constraint. The sound device consumes samples at a steady rate, so the emulator can use buffer depth as feedback. If the emulator gets too far ahead, it waits for the audio device to drain.

That is an elegant systems idea: use the component with the strictest real-time behavior as the clock.

## Why This Project Is Interesting

This project is a good example of engineering under constraints:

1. Use clear abstractions while developing.
2. Find the hot paths.
3. Remove abstraction where measurement proves it matters.
4. Move bulk work into libraries that execute outside Python loops.
5. Treat timing as a system property, not just a sleep call.

The result is not the most idiomatic Python code possible. It is Python shaped around the performance requirements of an emulator.

That is what makes it worth writing about.
