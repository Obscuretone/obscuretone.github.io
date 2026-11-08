---
title: The AI Couldn't Hear The Bug
description: From a crackling Tetris pause screen to an ultrasonic pulse that folded into audible range. Debugging PyGameBoy through its sound registers, sampled waveforms, and live playback.
published: "2026-07-29"
tags: [ai, emulation, gameboy, python, debugging, audio, testing]
---

The first clue was where I heard the static. Tetris was sitting on its pause screen, and [PyGameBoy](/posts/en/pygameboy) still sounded like it was playing through loose wiring. I gave the coding agent the symptom in one sentence.

> The sound is kind of staticy even on the Tetris pause screen.

I had the speakers. The agent had the source and could run the emulator. The pause-screen clue sent us down the signal path, where a perfectly ordinary square wave was riding on a constant voltage.

## The Tetris Pause Screen

The old mixer routed each channel's four-bit output into the stereo mix as a number between 0 and 15. A pulse spending equal time at both extremes had an average of 7.5. Making the waveform smaller also made the offset smaller, but the offset was still there.

The first fix centred the four-bit values before mixing. We later corrected the polarity too. The Game Boy's channel DACs map digital zero to positive full scale and 15 to negative full scale. The console's AC-coupled output pulls sustained offsets back toward zero. In PyGameBoy, each stereo side carries a capacitor value forward as part of the emulated sound unit. [Pan Docs on the mixer and DACs](https://gbdev.io/pandocs/Audio_details.html#dacs "emulation, audio, hardware | Pan Docs DAC details")

We first put the high-pass filter in the audio callback, where it ran on blocks requested by the operating system. Moving it into the sample producer gave it a clock that belonged to the emulated hardware. We also stopped filling starved buffers by holding the last sample indefinitely. Tetris was a good place to hear the difference. The next complaint, crackling and buzzing during ordinary play, needed finer instruments. [The original mixer change](https://github.com/Obscuretone/pygameboy/commit/c02d5a56dc1ea361e8931708f5a8e6c150bbbab5 "emulation, audio, testing | Original mixer and silence changes")

## A Right Shift Can Silence a Channel

The first pulse channel has an 11-bit pitch setting and a sweep unit. Trigger the channel and the sweep copies the setting into an internal shadow register. At the next sweep update, it shifts that value right and adds or subtracts the result. The Game Boy also checks whether the *following* calculation would overflow. That second check can kill the note on the same tick that changes its pitch. [Pan Docs on pulse sweep](https://gbdev.io/pandocs/Audio_details.html#pulse-channel-with-sweep-ch1 "gameboy, audio, hardware | Channel 1 sweep")

We turned that into a bus-level test. Set `NR10` to `0x11` for addition, a pace of one and a one-bit shift. Trigger channel 1 with a pitch setting of 1,000, then overwrite the low pitch byte before the sweep tick. The shadow register still holds 1,000. Here is what the sweep does when it wakes up.

```text
1000 + (1000 >> 1) = 1500   store the new pitch
1500 + (1500 >> 1) = 2250   exceeds 0x7FF, so clear CH1's active bit
```

The test reads `NR52`, the sound status register, and checks that bit zero is clear. It also checks that the internal pitch reached 1,500. Clamping the result to 2,047 or deferring the overflow until the next tick would leave a tone playing that the cartridge expects to have ended. [The sweep regression test](https://github.com/Obscuretone/pygameboy/blob/67d18c58048edc3caad85c8839d116d9906ac7ea/tests/test_apu_hardware.py#L31-L40 "gameboy, testing | Sweep shadow and overflow test")

The CPU was batching audio clocks for speed. That meant an instruction could reach a sound register while the APU still owed cycles from earlier instructions. The fix kept batching, then flushed pending APU time up to the bus access before reading or changing a register. A test runs the same program in one batch and one instruction at a time, then compares oscillator timing and the generated samples. [CPU timing fix and regression tests](https://github.com/Obscuretone/pygameboy/commit/67d18c58048edc3caad85c8839d116d9906ac7ea "gameboy, timing, testing | DMG sound implementation")

## Where the Phantom Tone Came From

With the second pulse channel set to `0x7FF`, each duty step takes four base-clock cycles. Eight steps make a full period. At 4,194,304 base clocks per second, that produces a 131,072 Hz pulse. Sample it at 44,100 Hz and its fundamental folds into the audible band. Three times the sample rate is 132,300 Hz. The difference is 1,228 Hz, which is also the strongest frequency bin in a Fourier transform of the point-sampled probe.

![Measured output traces for a 131.072 kHz synthetic pulse. Point sampling yields a large 1.228 kHz alias. The integrated and filtered output is nearly flat on the same amplitude scale.](/images/pygameboy-phantom-tone.svg)

PyGameBoy now integrates the area under each digital waveform over the sample interval, accounting for the time spent at each level. That feeds an 88.2 kHz intermediate stream. A 64-tap low-pass filter with an 18 kHz cutoff runs before decimation to 44.1 kHz. In this probe, the measured output RMS fell **70.4 dB** after matching the mixer gain. [Probe measurements](https://github.com/Obscuretone/pygameboy/blob/67d18c58048edc3caad85c8839d116d9906ac7ea/benchmarks/gb-sound-2026-11-07.json "audio, testing | Ultrasonic alias probe")

The clip plays 1.2 seconds of the reconstructed point sampler, a short pause, and 1.2 seconds of output from the current emulator. Both halves use the same nominal gain and the same synthetic pulse. [Play the A/B audio probe](/audio/pygameboy-phantom-tone.wav)

## What Changes on Game Boy Color

The monochrome fixes brought all twelve Blargg DMG sound ROMs to a pass. At that point, five of the twelve Color tests still failed. The first failing Color test checked length counters across a power cycle. Others interrogated the 16 bytes of wave RAM, where each byte holds two four-bit samples. [DMG test results](https://github.com/Obscuretone/pygameboy/blob/67d18c58048edc3caad85c8839d116d9906ac7ea/benchmarks/gb-sound-2026-11-07.json "gameboy, testing | DMG sound ROM results") · [Color test results](https://github.com/Obscuretone/pygameboy/blob/7b070235025301f4a685788cbd20ff8f825fd200/benchmarks/gbc-sound-2026-11-07.json "gameboy color, testing | Sound ROM results before and after the Color model")

On the original Game Boy, an active wave channel gives the CPU a narrow window to access wave RAM. A read outside it returns `0xFF`. On Color, if the channel is fetching from `0xFF31`, a CPU write to `0xFF3F` can land in `0xFF31`. The channel's playhead picks the byte. On monochrome hardware, a retrigger timed near a fetch can even overwrite the beginning of the waveform. Color also clears the length counters when the APU is powered off and ignores writes to them while off. DMG preserves the counters and accepts those writes. Once the emulator applied the Color rules, all twelve Color sound ROMs passed. [Wave RAM behavior in Pan Docs](https://gbdev.io/pandocs/Audio_Registers.html#ff30ff3f--wave-pattern-ram "gameboy color, hardware | Wave RAM access rules")

## The Audio Device Still Has a Deadline

The sound ROMs run as cartridges and can catch a wrong status bit or a write hitting the wrong byte. The synthetic probe checks the generated signal. We also captured the live audio callback while Super Mario Land walked and jumped through a level and while Pokémon Crystal ran in Color mode. A queue shortfall shows up there even if every sample the APU managed to produce was correct.

We raised the playback reserve to 3,072 samples, about 70 ms, and kept frame skipping available to buy time when the queue ran low. Mario's three runs completed without missing samples. Two of the three final Crystal runs did too. The third was short by 755 samples, about 17 ms. The callback now ramps down and back up across a gap, so a shortfall starts with a fade instead of a voltage step. [Mario scene-load measurements](https://github.com/Obscuretone/pygameboy/blob/7b070235025301f4a685788cbd20ff8f825fd200/benchmarks/audio-scene-load-2026-11-07.json "audio, performance | Live callback measurements") · [Crystal callback measurements](https://github.com/Obscuretone/pygameboy/blob/7b070235025301f4a685788cbd20ff8f825fd200/benchmarks/gbc-sound-2026-11-07.json "audio, gameboy color | Crystal callback measurements")

The rewind work had already forced a similar split. Oscillator phase, the capacitor and the filter's recent inputs travel back with the emulated hardware. The queue that feeds the speakers belongs to the host and gets cleared on rewind. The same distinction makes a crackle easier to chase. A wrong bit in `NR52` can send you to an 11-bit adder. A 1,228 Hz peak can send you to the sampler. An empty queue sends you to the host's frame loop. Each of those faults can reach the speakers as a buzz or a click, but each leaves a different trace. [How PyGameBoy rewinds hardware](/posts/en/pygameboy_rewind)
