---
title: Mario Has a Shotgun Now
description: A request to replace Super Mario World's fire flower became a native Mac build with a pump-action shotgun, shell ejection, blood particles, and a continuous six-enemy killchain.
titleformat: prose
published: "2026-11-13"
tags: [games, reverse-engineering, c, ai, testing, software]
---

I asked Codex to find or decompile Super Mario World, give Mario a shotgun instead of a fire flower, and add a blast, an ejected shell, and blood when it killed something. It found an existing reverse-engineered C implementation, modified the game, built a Mac application, and opened it. Mario was standing in Dinosaur Land holding a shotgun.

The next requirement was a video with a valid killchain. Six Rexes go down in the continuous run below. The sound comes from the running game, including the new blast and pump effects.

![Mario firing a shotgun through six enemies in one continuous Super Mario World run](/videos/mario-shotgun-block-acquisition.mp4 "poster: /images/mario-shotgun-block-acquisition.webp")

The clip runs for 28.44 seconds. Mario starts unarmed, collects the first Dragon Coin, bumps the flying question block, and jumps onto it to collect the shotgun it releases. Only then can he fire. The world pickup disappears on collection; the weapon is now in his hands. Controller input is automated. The enemies come from the level's own sprite data; the recorder does not place a row of targets for Mario to shoot. [Download the video](/videos/mario-shotgun-block-acquisition.mp4) or inspect the [capture summary and input log](/downloads/mario-shotgun-block-acquisition-evidence.zip).

## The Reverse Engineering Was Already There

There is a substantial amount of other people's work underneath this joke.

[snesrev/smw](https://github.com/snesrev/smw/tree/eae20c65c58930c8b62c76188d259579ad4130f1 "code, reverse-engineering, c | Native Super Mario World implementation") already reimplements the game in C. Its runtime includes SNES display and sound components, and its normal setup extracts level, graphics, and audio resources from a game image. That provided a complete game to modify.

[SMWDisX](https://github.com/IsoFrieze/SMWDisX/tree/30643c7595a7d097d731de69476f8059c7cf98c3 "code, reverse-engineering, assembly | Super Mario World Disassembly X") provides an assemblable disassembly. I did not have a ROM sitting in the working directory. Codex built the US version from that disassembly with [Asar 1.91](https://github.com/RPGHacker/asar/tree/v1.91 "code, assembly, tooling | Asar assembler"), checked the resulting image, and extracted the resources for the native build. The reconstructed image was 524,288 bytes and matched the expected SHA-1, `6b47bb75d16514b6a476aa0c73a683a2a4c18765`.

The modification builds on those projects. The AI did not recover the whole game from scratch during this conversation. Its work here was finding a usable foundation, changing the attack, integrating the effects, testing the result, and packaging it.

## A Shotgun Changes the Attack Rule

The original fireball has a small projectile moving through the level. The shotgun checks a widening region in front of Mario when the shot fires. Every eligible enemy intersecting that region is hit immediately, up to 96 game pixels away within the visible playfield. The visible pellets travel afterward as part of the animation.

That distinction makes the weapon feel immediate. The hit has already happened when the muzzle flash appears. A Banzai Bill can disappear into blood particles while the shell is still tumbling out of the gun.

The attack deliberately bypasses normal fire immunity. It still needs to distinguish an enemy from the other things occupying sprite slots. Yoshi, dolphins, moving platforms, power-ups, keys, and goal objects have jobs to do. Clearing every sprite in front of the player would destroy parts of the level along with its enemies.

The implementation uses an explicit hostile-sprite classification and the game's existing clipping rectangles. It also handles hostile extended and cluster sprites, including projectiles and ghosts. Bosses have separate defeat-state handling because their disappearance can be part of the machinery that lets a level finish.

The weapon has unlimited ammunition and a 28-frame pump cycle. The blast penetrates scenery. Those are the rules of this version, and they explain why the shotgun is spectacularly unfair.

## The Flower Becomes the Gun

Replacing the attack leaves several visible places to update.

Mario needs to hold the weapon. The pickup in the level needs to look like a weapon. The reserve box needs the same replacement. The gun sits lower, around his waist, and has to follow his facing direction, ducking pose, and position on Yoshi. Swimming and climbing take different paths through the player code, so firing needs to reach those states too.

The new visuals are drawn in game-sized pixels after the original scene renders. The blast adds a short muzzle flash, pellet trails, smoke, red blood particles, recoil, and a little screen shake. The ejected shell alternates its orientation as it falls. Its brass end and red body remain visible at the game's small scale.

The shotgun sound is synthesized in code and mixed into the game's audio buffer. A short noise burst and a decaying low tone make the blast; two later metallic clicks suggest the pump action. The video captures that mixed output directly.

The Mac app starts Mario unarmed. The flower variant of the flying question block releases a shotgun even when Mario is small. He has to touch the pickup to acquire it. Fire-flower pickups elsewhere grant the same weapon, Mario keeps his regular red-and-blue outfit, and taking damage follows the game's existing power-up rules.

## The Video Has to Kill Something

The first preview used a reproducible test scene with enemies deliberately positioned in front of Mario. That is useful for checking the attack. For the video, I wanted a sequence through the level with its original enemies.

The recorder loads Yoshi's Island 1 through the native level loader, starts Mario unarmed, and supplies movement, jumping, and firing through the game's controller input. It captures every frame and the corresponding audio samples in one run. The video shows only the game and its original HUD.

The six recorded removals occur at frames 661, 785, 1032, 1179, 1288, and 1602. The capture contains 1,704 frames, six accepted shots, one collected Dragon Coin, and no damage taken. The Dragon Coin counter increments at frame 164. The flying question block activates at frame 410, and Mario consumes its shotgun pickup at frame 516. The recorder checks that the pickup is consumed when Mario becomes armed, that no shot fires before collection, and that no world shotgun pickup remains afterward. There are no cuts between the kills. Each enemy remains visible for at least 36 frames before the controller fires, and the shorter blast range gives them time to approach.

The first capture had a visual bug: the hills shimmered while scrolling. The recorder's direct level load had omitted the fade-out mosaic state, leaving the transition's 2-by-2 pixel grouping active during gameplay. Initializing that transition correctly removes the effect. The recorder now checks every captured frame for leftover mosaic grouping. The same direct-load shortcut also skipped the level music bank and its start command, leaving the previous music playing. The recorder now uploads the level bank, starts the track selected by the level header, and checks that the native SPC player is playing that track.

That is a small, concrete claim. It shows this weapon functioning against those enemies in this run. The broader regression checks exercise targets behind Mario, fire immunity, objects that should survive, off-screen targets, reload and pause behavior, world-coordinate boundaries, audio generation, and drawing within the pixel buffer.

One early integration check failed because it inspected the result before the game's NMI had latched the button press for the next tick. Giving the input its actual frame boundary made the distinction visible: the controller request and the resulting shot belong to adjacent steps in the running game.

The tests also check the selected defeat states for all seven Koopaling variants. A complete playthrough and every boss cutscene still need testing. The [mod source and patch](/downloads/smw-shotgun-block-acquisition-source.zip) include the implementation, integration tests, and recorder so the result can be inspected and extended.

Dinosaur Land has a pump-action shotgun now.
