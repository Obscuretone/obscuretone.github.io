---
title: "while (rom.hasSpace()) python.addFeature();"
titleformat: code
description: GBPython puts a persistent Python REPL inside a Nintendo Game Boy ROM, using banked cartridge memory for syntax trees and objects, integer arithmetic for floating point, and PyGameBoy as its test machine.
tags: [gameboy, python, interpreters, emulation, software, architecture]
---

Feature lists usually shrink when the target machine does. [GBPython](https://github.com/Obscuretone/GBPython "gameboy, python, interpreters | GBPython source") went in the other direction.

It is a Python interpreter inside a Nintendo Game Boy cartridge. Source is entered through an on-screen keyboard, tokenized and parsed on the Game Boy's roughly 4 MHz LR35902 processor, and executed by a tree-walking evaluator. Functions remain defined after a program finishes, so the next program can call them like a persistent REPL. The ROM boots with FizzBuzz already typed into its 20-column editor.

This is not Python source compiled into a ROM ahead of time, and it is not a desktop interpreter using the Game Boy as a display. The lexer, parser, runtime, object model, and user interface all run as Game Boy code. The machine has 8 KiB of work RAM.

That should have encouraged restraint.

## The Feature List Became A Loop

The first commit in GBPython's public history already contained functions, recursion, strings, lists, dictionaries, exceptions, interactive input, and a headless test suite. The commits that followed added real single-precision floats, 32-bit integers, tuples, sets, classes, a standard library, inheritance, `try` and `except`, methods on built-in types, mutable lists, `super()`, `finally`, sorting, `join`, and f-strings.

The [entire visible sequence](https://github.com/Obscuretone/GBPython/commits/main "gameboy, python, software | GBPython commit history") is dated August 7, 2026. Read from the bottom upward, it resembles a loop whose terminating condition is free ROM space:

```text
Python interpreter
real floats
tuples and sets
classes and import
inheritance and exceptions
mutable lists
finally
f-strings
boot into FizzBuzz
```

The strange part is not that each feature can be implemented. Python's surface syntax is approachable, and a tree-walking interpreter can be built from small pieces. The strange part is that every familiar convenience needs somewhere to live on a machine whose memory map can be drawn on one page.

## Python, With Physical Limits

GBPython implements a substantial Python 3 subset rather than a calculator wearing Python punctuation. Values have distinct integer, float, string, list, tuple, dictionary, set, boolean, object, and `None` types. Division returns a float. Floor division rounds down. Modulo takes the divisor's sign. Comparisons chain with short-circuiting, and empty strings and containers are false.

Functions have lexical scoping, arity checks, recursion, `return`, and `global`. Classes have methods, `__init__`, attributes, single inheritance, and `super()`. Exceptions can be selected by name and paired with `finally`. Definitions persist between runs.

The bundled examples include a class whose magnitude method calls a square root imported from the ROM standard library:

```python
import math

class Vec:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def mag(self):
        return sqrt(self.x*self.x + self.y*self.y)

v = Vec(3, 4)
print(v.mag())
```

The result is `5.0`, calculated on the Game Boy.

The limits are concrete. Integers wrap at 32 bits. Floats display four decimal places. Functions accept at most four parameters. Recursion stops at depth 16. Source entered through the editor fits in a 254-byte buffer. There are no comprehensions, generators, format specifications, multiple inheritance, or `with` blocks.

These are not arbitrary omissions from a compatibility checklist. They are the outline of the hardware.

## Put The Syntax Tree In The Cartridge

The Game Boy provides 8 KiB of work RAM and 8 KiB of video RAM. The GBPython cartridge adds 128 KiB of banked ROM and 32 KiB of battery-backed SRAM through an MBC5 controller. The interpreter uses both kinds of cartridge memory as part of its runtime architecture.

Bank 0 of ROM is always visible. It holds the main loop, lexer, hot allocation paths, and small helpers that need to be callable without switching banks. The evaluator, parser, rendering code, built-ins, methods, and floating-point operations live in switchable banks. A banked function cannot safely read a string constant from its caller's bank, so messages crossing that boundary are staged through work-RAM buffers first.

The [SRAM layout](https://github.com/Obscuretone/GBPython/blob/main/docs/ARCHITECTURE.md "gameboy, python, architecture | GBPython memory architecture") turns the cartridge into a small object heap:

- bank 1 stores syntax trees;
- bank 2 stores strings;
- bank 3 stores lists, tuples, dictionaries, sets, and instances.

The temporary syntax-tree arena grows upward from the bottom of bank 1 and is discarded after each run. Function definitions grow downward from the top and survive, which is how a `def` entered in one program remains callable in the next. If the two arenas meet, the interpreter raises `MemoryError`.

Lists and dictionaries use linked blocks of four entries. Appending to a list adds another block without moving its head address, so aliases remain valid:

```python
a = [1, 2]
b = a
b.append(3)
print(a)
```

No garbage collector searches those banks for unreachable objects. The arenas grow until they cannot. An uncaught `MemoryError` clears variables, functions, and every arena, then reports that state was cleared. It is a harsh memory-management policy, but an extremely legible one.

## The Value Channel

A Python value in GBPython travels through the evaluator as a 32-bit integer plus a type tag. Integers occupy the value directly. Floats use the same bits as an IEEE-754 single-precision value. Strings and containers use the number as a pointer into the appropriate SRAM bank.

The evaluator publishes the current tag and string bank through global runtime state. Truthiness, comparison, rendering, membership, and method dispatch all consult that state. It is less comfortable than returning a generously sized tagged union from every recursive call, but it keeps the evaluator's stack frame small enough to recurse without colliding with the rest of work RAM.

Control flow uses another compact channel. `break`, `continue`, `return`, and errors set an execution signal that statement lists, loops, and function boundaries propagate. `try` can intercept the error signal. `finally` preserves a pending error or return value unless its own body replaces it.

The implementation repeatedly turns a language feature into a storage problem, then finds one more byte-sized place to put the answer.

## Floating Point Was Not Included

GBDK-2020 does not provide a floating-point library for the Game Boy's SM83 target. Python still expects `/` to perform true division, `8/2` to produce `4.0`, and mixed numeric expressions to behave sensibly.

GBPython therefore carries its own IEEE-754 single-precision implementation. Addition, subtraction, multiplication, division, comparison, conversion, and rendering operate on raw 32-bit patterns using integer arithmetic. The `math` module implements functions such as `sqrt`, `floor`, `ceil`, and `gcd`; `sqrt` uses Newton's method on those software floats.

The standard library is equally literal. `math` and `random` are stored in ROM as GBPython source and compiled when imported. An import is not a lookup into a native function table pretending to be a module. The interpreter parses more of its own language.

F-strings follow the same strategy. The parser turns literal fragments and embedded expressions into string conversions and concatenations. The inner expression is re-lexed from a work-RAM buffer while the outer lexer state waits. Nested f-strings and format specifications are excluded, but arbitrary ordinary expressions work inside the braces.

On a desktop interpreter, these are language conveniences. Here they are visible arrangements of ROM banks, buffers, tags, and integer operations.

## Test The ROM Through The Screen

GBPython's test runner depends on [PyGameBoy](/posts/en/pygameboy), the Python emulator that made the project possible in the first place. `make test` builds the cartridge, boots it headlessly inside the emulator, executes programs, and checks what the Game Boy displays.

The fast path reads symbol addresses from GBDK's `.noi` output, writes source directly into the ROM's input buffer, moves the on-screen cursor to the run key, and presses A. When execution finishes, the harness decodes characters from the background tile map because that is where the ROM printed its result.

The end-to-end path is less polite. It navigates the on-screen keyboard with D-pad events and enters every character through the same editor a player uses. Each cursor movement is checked against the ROM's cursor variables and retried if the emulated joypad edge was missed. Other tests pause inside `input()`, type a response, and submit it while the program is running.

The current suite reports 227 passing checks. Example programs are tests too: comments beginning with `# expect:` describe the output that must appear in the five-line output window.

The dependency is pleasantly circular. PyGameBoy emulates the machine on which GBPython runs. GBPython, in turn, is a complicated cartridge that exercises PyGameBoy's CPU, memory controller, SRAM banking, PPU, input, and timing. The emulator tests the interpreter through a Game Boy screen, while the interpreter gives the emulator increasingly unreasonable work to do.

## A Small Computer Makes The Language Visible

On a modern system, Python can feel detached from its storage. A function exists. A list grows. An import succeeds. Memory is somebody else's abstraction until a process becomes unusually large.

GBPython removes that distance. A persistent function occupies one side of an SRAM arena. A mutable list is a chain of four-entry blocks. A float is an integer routine in a banked ROM. A long identifier makes syntax-tree nodes larger, so shorter node variants are introduced to recover capacity. Adding a built-in can force an entire dispatcher into another ROM bank.

The result is not CPython, and it is not intended to run ordinary Python packages. It is enough of Python for the language's semantics to press directly against the cartridge's address lines.

The ROM kept having space. Python kept acquiring features.
