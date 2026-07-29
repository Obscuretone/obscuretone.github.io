---
title: The AI Didn't Hear The Audio Bug - And Still Fixed It
description: A static-filled Game Boy emulator became a debugging exercise in human perception, DC bias, audio buffering, analog hardware, and tests for a problem the coding agent could not hear.
tags: [ai, emulation, python, debugging, audio, testing]
---

I found a bug an AI coding agent could fix but could not perceive. [PyGameBoy](/posts/en/pygameboy) was producing audio, but Tetris sounded like it was being played through loose wiring: static, distortion, and crackling that continued even on the pause screen.

My bug report was one sentence:

> The sound is kind of staticy even on the Tetris pause screen.

The agent had no access to my speakers. It did not record the emulator, inspect a waveform from the sound device, or hear the noise. I was the only audio sensor in the debugging loop.

That small observation was still enough to begin an investigation because "static while paused" contains more information than "the audio is bad." A bad note might implicate an oscillator or frequency calculation. Noise that survives the pause screen points farther down the path, where channels are mixed, samples are buffered, and silence is translated into voltage.

## A Voltage Problem Hiding In Python

The old mixer represented each Game Boy channel as an integer from 0 through 15. It routed those values into the left and right outputs, added them together, and normalized the result.

The arithmetic looked reasonable until the signal was considered as a waveform. A square wave alternating between 0 and 15 has an average of 7.5. Normalization can make that waveform smaller, but it cannot move the centre to zero. The output remains a changing signal balanced on top of a constant positive value.

That constant component is DC bias.

The Game Boy's channel DACs are bipolar. The [hardware model documented by Pan Docs](https://gbdev.io/pandocs/Audio_details.html "emulation, audio, hardware | Pan Docs audio details") maps the four-bit range into an analog range centred around zero:

```text
0  -> -1.0
15 -> +1.0
```

The corrected mixer performs that conversion before stereo routing and master-volume gain. A 50 percent square wave can now alternate between equal negative and positive values rather than treating zero as the bottom of an entirely positive waveform. The change is visible in the [audio-mixing implementation and tests](https://github.com/Obscuretone/pygameboy/commit/c02d5a56dc1ea361e8931708f5a8e6c150bbbab5 "emulation, audio, testing | Correct DMG audio mixing and silence"), where exact channel values produce exact expected stereo samples.

The agent could not hear the offset, but it could prove that the old representation had one.

## The Buffer Could Manufacture More DC

The mixer was not the only source.

The host audio callback periodically asks the emulator for a block of samples. When the ring buffer did not contain enough, the old callback filled the remaining space by repeating the last sample it had received. If that sample happened to be `+0.18`, the callback held the output at `+0.18` until fresh audio arrived.

The repeated sample prevented a discontinuity inside that callback, but it also manufactured a sustained voltage from one arbitrary point in a waveform. When new samples arrived, the output jumped from the held value to wherever the new waveform happened to begin. Enough repetitions and jumps become clicks, crackling, and a static-like rasp.

A real underrun now produces zero for the missing frames. That does not make underruns desirable, and an abrupt transition to zero can still click, but it does stop a starved host buffer from extending stale DC indefinitely. The callback tests cover full, wrapped, partial, and empty buffers so that the fallback is a contract rather than an intuition.

## The First Fix Lived In The Wrong Layer

The first attempt at removing DC added a block-vectorized high-pass filter to the host callback. It used the Game Boy capacitor's documented charge factor and passed a numerical test showing that a constant input decayed toward zero.

It was also [backed out](https://github.com/Obscuretone/pygameboy/commit/c4db55350daa7c33c50cc790bd5a4c06ce27c5d4 "emulation, audio, performance | Back out the host audio filter").

The callback is an awkward owner for emulated analog state. Its block size belongs to the host audio device, and callback work competes with the emulator for time. A hardware capacitor should advance according to the samples produced by the emulated machine, not according to however the operating system happens to request them.

The final design moved the capacitor into the APU's sample producer. At each 44.1 kHz sample, each stereo side applies the recurrence:

```text
output = raw - capacitor
capacitor = raw - output * charge
```

The callback now has one job: drain samples that have already been formed. Changing the host block size cannot change the waveform, and powering off the APU resets its analog state along with its mixer output.

Using the DMG charge constant at PyGameBoy's sample cadence gives the model a cutoff of approximately 28 Hz. That is low enough to preserve the useful audio band while allowing sustained offset to decay, which is what the original Game Boy's AC-coupled output stage was there to do.

## Correct Audio Still Has To Arrive On Time

A mathematically better sample is not useful if Python cannot produce it before the sound device asks.

PyGameBoy uses the audio queue as its host pacing signal. A deep queue pauses the producer, while a shallow queue can suppress a video frame so the emulator spends its budget rebuilding audio. An earlier pacing bug used a Pygame delay that could busy-wait and starve the Python audio callback of the GIL; replacing it with a yielding sleep allowed the callback and emulator to make progress together.

The audio changes also made expensive paths easier to notice. A later [performance pass](https://github.com/Obscuretone/pygameboy/commit/37fd9707ec844a0b3b5ef64dd0de3ca17142bdc1 "emulation, python, performance | Restore real-time Tetris audio performance") batched exact noise-channel LFSR transitions and inlined several opcodes common in the game's polling loops. The optimization tests compare state and timing, including the number of LFSR edges and the bus phase of timed memory access, so "faster" does not silently mean "less like the hardware."

The symptom crossed several boundaries before it disappeared: signal representation, buffer policy, callback scheduling, analog filtering, CPU throughput, and noise-channel execution. No individual layer contained the entire bug.

## Testing A Sound Without Hearing It

The corrected system can be checked numerically:

1. DAC endpoints map into a bipolar range.
2. Stereo routing and NR50 gain produce expected samples.
3. Capacitor state changes successive samples according to the recurrence.
4. Powering off the APU resets the mixer and capacitor.
5. Partial and empty host buffers are padded with zero.
6. Exact noise transitions remain exact after batching.
7. The pinned Blargg sound-register baseline still passes in the [published conformance run](https://obscuretone.com/pygameboy/ "emulation, audio, testing | PyGameBoy conformance report").

That last test is deliberately narrow. A sound-register ROM can verify masks and power behaviour; it cannot certify that music sounds good. Numerical tests can establish that the implementation follows its model, but the original complaint concerned the experience of listening.

I ran Tetris again.

My ears remained the final acceptance test.

## Ears In The Loop

The interesting capability was not an AI secretly hearing my computer. It had no ears in this interaction.

I supplied a sensory observation and enough context to distinguish persistent static from a wrong note. The agent translated that report into falsifiable causes, inspected the code, followed the signal across software and hardware models, and built tests around the resulting explanation. Pan Docs supplied the reference circuit. The test ROM supplied an external compatibility check. Listening supplied the verdict that the measurements could not.

None of those inputs was sufficient alone. My report could identify an unpleasant sound without locating the arithmetic. Source inspection could expose a DC bias without proving that it matched what I heard. Tests could lock down the correction without deciding whether the emulator had become pleasant to use.

Together they formed a debugging instrument with human perception at one end and executable evidence at the other. That is a more useful picture of AI-assisted engineering than pretending either participant perceived the whole system.
