---
title: PyGameBoy In Color
description: Game Boy Color support turned one monochrome framebuffer into a hardware-model problem involving banked memory, tile attributes, palette RAM, DMA, double speed, boot state, and visual conformance.
tags: [emulation, gameboy, python, color, hardware, testing]
---

Adding Game Boy Color support to an emulator sounds like a rendering task. Replace four shades with RGB values, load a colorful game, and declare the screen upgraded.

Changing the framebuffer was the easy part.

The Game Boy Color keeps the original machine's address space and most of its programming model, then makes more hardware visible through bank-selection registers. Video RAM gains another bank. Work RAM gains several. Tile maps gain a parallel bank of attributes. Background and object palettes become indexed memory. DMA learns to transfer during horizontal blanking. The processor can double its speed while the display continues on its own clock.

Color did not replace the monochrome machine. It multiplied the state hidden behind the same addresses.

## One Header Bit Is Not A Hardware Model

A Game Boy cartridge header contains a CGB flag at `0x0143`. It tells the console whether the program supports or requires Game Boy Color features. The tempting emulator implementation fits in one line:

```javascript
if (cartridge.cgb) memory.bankEverything();
```

That is enough to distinguish a Color-only ROM from an ordinary monochrome ROM in a basic launcher. It is not enough to describe the machine.

A Game Boy Color can run a monochrome cartridge in compatibility mode. A dual-mode cartridge can run on either generation. The cartridge declares what the software understands; the selected console model determines which hardware exists and how it starts. Those are related inputs, not one boolean.

PyGameBoy's first Color implementation allowed the cartridge flag to select `gbc_mode`. That made CGB-only software reach the new registers, but it also collapsed hardware selection, software compatibility, and boot state into the same decision. The distinction became visible when CGB-specific [Mooneye](https://github.com/Gekkio/mooneye-test-suite "emulation, gameboy, testing | Mooneye Test Suite") boot-register and unused-I/O tests entered the suite.

The correction separated the questions. The selected console model determines which hardware exists. The cartridge header determines whether that software runs in native CGB mode, compatibility mode, or not at all. Startup state and I/O visibility follow from both inputs instead of leaking out of one convenient boolean.

A colorful frame was not evidence that those states had been separated correctly. Passing hardware-state tests was.

## Flat Memory Meets More Banks

PyGameBoy's performance model begins with a flat 64 KiB `bytearray`. The CPU's common read path can index that array directly rather than asking a hierarchy of bus objects to resolve every address. Cartridge controllers already preserve this design by copying the selected ROM and external-RAM windows into the CPU's visible memory view.

Game Boy Color extends the same problem into internal memory.

The CPU still sees video RAM at `0x8000–0x9FFF`, but the `VBK` register selects one of two physical 8 KiB banks. It still sees switchable work RAM at `0xD000–0xDFFF`, but `SVBK` selects banks 1 through 7; selecting zero aliases bank 1. Echo RAM must reflect the currently visible work-RAM bank rather than becoming an independent stale copy.

PyGameBoy keeps fast reads flat by treating a bank switch as synchronization work. The outgoing visible window is copied back to its backing bank, the selected bank is copied into the flat address space, and the register records which physical storage now appears at those addresses.

That preserves the original optimization, but it changes the meaning of the memory array. It is no longer the machine's complete state. It is the currently selected projection of that state.

## Every Tile Acquired An Attribute Byte

On the monochrome Game Boy, a background tile map is largely a grid of tile numbers. The palette register maps each tile's two-bit pixel value onto one of four shades.

In CGB mode, VRAM bank 0 still stores the tile number. The corresponding address in bank 1 stores an attribute byte. Its bits select one of eight palettes, choose which VRAM bank contains the tile data, flip the tile horizontally or vertically, and assign background-to-object priority.

The renderer therefore has to read two parallel maps before it can draw one tile:

```text
VRAM bank 0: tile number
VRAM bank 1: palette | tile bank | x flip | y flip | priority
```

Objects use their attribute byte differently. They gain three palette-selection bits and a tile-data bank bit while retaining flip and priority behavior. CGB also introduces an object-priority mode based on OAM order rather than the monochrome model's X-coordinate rule.

PyGameBoy's CGB scanline path gathers tile numbers and attributes from both banks, applies flips, selects the correct tile-data bank, and carries the raw background color index and priority bit into object composition. The final RGB pixel is the last step. Most of the work determines whether that pixel is allowed to appear.

## Palette RAM Is A Device

The CGB does not expose its colors as a convenient array of host-language tuples. It provides 64 bytes of background palette memory and 64 bytes of object palette memory behind index and data registers.

Each side holds eight palettes of four colors. A color is a little-endian 15-bit word with five bits each for red, green, and blue. The index registers choose a byte and can automatically advance after a data write, which means palette programming has observable register behavior in addition to stored color values.

PyGameBoy models the two 64-byte memories separately, including index masking and auto-increment. When a scanline is rendered, each five-bit component is expanded to eight bits using the same conversion required by the [cgb-acid2 reference image](https://github.com/mattcurrie/cgb-acid2 "emulation, gameboy, testing | cgb-acid2 visual PPU test"):

```text
(component << 3) | (component >> 2)
```

The host framebuffer changes from one shade index per pixel to three color channels per pixel. That change is visible and easy to demonstrate. The indexed device that produced the value is the part a cartridge can depend on.

## Two Speeds, Several Clocks

The Game Boy Color can switch the CPU into double-speed mode through `KEY1` and the `STOP` instruction. The name makes the feature sound global. It is not.

The processor executes twice as much work relative to parts of the machine that remain tied to the normal-speed clock. Timer behavior, serial transfers, DMA, audio, and PPU progress have to consume the correct notion of elapsed time. Simply doubling the emulator's main loop would make every peripheral run twice as fast too.

PyGameBoy keeps instruction cycle accounting at the CPU boundary, then scales the cycles delivered to normal-speed subsystems when double speed is active. The switch itself updates `KEY1`, clears the prepare bit, and resumes execution instead of leaving the processor stopped.

CGB DMA adds another clock boundary. General-purpose DMA copies a requested number of 16-byte blocks into VRAM immediately. HBlank DMA copies one block during each horizontal blanking period, updates its source and destination registers, and can be cancelled while active. Both modes interact with the selected VRAM bank and the PPU's scanline state.

This is why Color support spread through CPU, timer, memory, and video code instead of remaining a palette patch.

## The Boot Screen Became A Test Fixture

Boot state matters more once console model and cartridge mode can diverge. Skipping firmware means the emulator must establish the documented registers and memory state that real startup code would have left behind. Running firmware means the CPU begins at `0x0000` and the firmware has to perform that handoff itself.

PyGameBoy now includes original 256-byte firmware rather than redistributing Nintendo's boot ROM. It scrolls `PYGAMEBOY` onto the display, adds a five-color `COLOR` line for CGB cartridges, plays a two-note pulse-channel chime, disables itself, and enters the cartridge. The DMG and CGB variants are built from maintained assembly and embedded byte-for-byte so installing the Python package does not require an assembler.

The animation is decorative, but it also creates an integration path through CPU instructions, VRAM, object attributes, palettes, audio registers, and the boot-ROM disable register before a game begins. Tests compare the generated bytes with the embedded image and execute both variants through the emulator.

Firmware cannot resolve the hardware-model question by itself. It makes incorrect initial state easier to see.

## A Color Cartridge Tests The Machine

[Obscuretone Test ROM](/posts/en/obscuretone_test_rom) originally targeted the monochrome Game Boy. Its CGB variant now runs the same complete legal base-opcode and CB-opcode coverage, then continues into Color-specific groups for boot mode, WRAM and VRAM banking, background-map attributes, palette RAM, general-purpose and HBlank DMA, double speed, fast serial, the infrared register, object priority, and the PCM output registers.

The ROM reaches those features as cartridge software. It changes banks through I/O registers, performs transfers, switches speed with `STOP`, and reports each group through the versioned `OTR/1` serial protocol before ending in `PASS`. PyGameBoy's host test also verifies the cartridge-RAM mailbox, the text written into the background tile map, the RGB framebuffer shape, and the opcode profile produced during the run.

This creates a CGB conformance layer for behavior the CPU can observe. It does not prove that the selected colors and priority rules produced the correct picture. That requires a test whose output is the picture.

## A Smiling Face With Exact Pixels

Ordinary games are good demonstrations and weak specifications. If a character appears with approximately the right colors, incorrect priority, window state, tile banking, or sprite selection can hide elsewhere in the frame.

[cgb-acid2](https://github.com/mattcurrie/cgb-acid2 "emulation, gameboy, testing | cgb-acid2 source and reference image") is a visual test for those rules. Its smiling face exercises background and window tiles, both VRAM banks, horizontal and vertical flips, background-to-object and object-to-background priority, the ten-object-per-line limit, object ordering, 8-by-16 tile selection, and window-line behavior. A scanline renderer is sufficient; the test does not require a dot-accurate pixel FIFO.

The PyGameBoy test harness runs the ROM headlessly, advances the machine until the program halts, renders the stable frame, converts it to RGB, and compares every pixel with the pinned reference PNG. The ROM and image are stored with upstream revision and SHA-256 provenance.

The comparison entered the suite as a strict expected failure. Four CGB Mooneye cases used the same policy: `boot_regs-cgb`, `boot_hwio-C`, `unused_hwio-C`, and `vblank_stat_intr-C`. A normal expected failure kept known unfinished behavior visible without turning every development run red; `strict=True` made an unexpected pass fail the suite, forcing each test to be promoted into the claimed conformance floor instead of remaining mislabeled forever.

They are now ordinary passing tests. Acid2 proves the rendered CGB frame pixel for pixel. Mooneye checks the selected hardware's startup registers, I/O behavior, and interrupt timing through cartridge execution. Together they establish a boundary that a colorful game screenshot cannot.

## Color Was The Smallest Change

The monochrome renderer could represent a frame as 23,040 shade indexes. The Color renderer represents it as 69,120 RGB components. Memory for that difference is cheap on the host machine.

The expensive part is preserving the Game Boy Color's relationships: which VRAM bank the CPU can see, which bank a tile references, which palette an attribute selects, which priority rule wins, which work-RAM bank echo memory mirrors, which clock advances during double speed, which DMA block moves during HBlank, and which startup state belongs to the selected console.

The cartridge flag is one byte. The state it unlocks reaches almost everywhere.
