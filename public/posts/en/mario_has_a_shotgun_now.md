---
title: Mario Has a Shotgun Now
description: A request to replace Super Mario World's fire flower became a native Mac build with a pump-action shotgun, shell ejection, blood particles, and Super Saiyan star power with chargeable ki waves.
titleformat: prose
published: "2026-11-13"
tags: [games, reverse-engineering, c, ai, testing, software]
---

I asked Codex to find or decompile Super Mario World, give Mario a shotgun instead of a fire flower, and add a blast, an ejected shell, and blood when it killed something. It found an existing reverse-engineered C implementation, modified the game, built a Mac application, and opened it. Mario was standing in Dinosaur Land holding a shotgun.

The next requirement was a video with a valid killchain. Six Rexes go down in the original level, followed by three short ki shots and an eight-enemy Super Saiyan finisher in a practice course. The sound comes from the running game, including the new blast and pump effects.

![Mario collecting and firing a shotgun, then using Super Saiyan ki waves](/videos/mario-shotgun-saiyan.mp4 "poster: /images/mario-shotgun-saiyan.webp")

The updated clip runs for 51.90 seconds. Mario starts unarmed, collects the first Dragon Coin, bumps the flying question block, and collects the shotgun as it emerges from behind the block. Six shots defeat six of the level's own Rexes. A native level transition then leads to a separate ki practice course: three short shots, a full charge, and eight Chargin' Chucks. Controller input is automated, and the audio comes from the running game. [Download the video](/videos/mario-shotgun-saiyan.mp4) or inspect the [capture summary and input log](/downloads/mario-shotgun-saiyan-evidence.zip).

The shotgun now follows the glove pixels in Mario's animated body graphics, with a second white glove on the pump. The pickup is clipped behind the actual block edge during emergence. Larger, high-contrast pellets travel before applying damage, and a red-and-brass shell ejects during the pump cycle. Each of the six recorded impacts happens four frames after its trigger.

## The Reverse Engineering Was Already There

There is a substantial amount of other people's work underneath this joke.

[snesrev/smw](https://github.com/snesrev/smw/tree/eae20c65c58930c8b62c76188d259579ad4130f1 "code, reverse-engineering, c | Native Super Mario World implementation") already reimplements the game in C. Its runtime includes SNES display and sound components, and its normal setup extracts level, graphics, and audio resources from a game image. That provided a complete game to modify.

[SMWDisX](https://github.com/IsoFrieze/SMWDisX/tree/30643c7595a7d097d731de69476f8059c7cf98c3 "code, reverse-engineering, assembly | Super Mario World Disassembly X") provides an assemblable disassembly. I did not have a ROM sitting in the working directory. Codex built the US version from that disassembly with [Asar 1.91](https://github.com/RPGHacker/asar/tree/v1.91 "code, assembly, tooling | Asar assembler"), checked the resulting image, and extracted the resources for the native build. The reconstructed image was 524,288 bytes and matched the expected SHA-1, `6b47bb75d16514b6a476aa0c73a683a2a4c18765`.

The modification builds on those projects. The AI did not recover the whole game from scratch during this conversation. Its work here was finding a usable foundation, changing the attack, integrating the effects, testing the result, and packaging it.

## A Shotgun Changes the Attack Rule

The original fireball has a small projectile moving through the level. The shotgun sends nine visible pellets across a widening region in front of Mario. Their front advances 12 game pixels per frame, capped at 96 pixels ahead of him within the visible playfield. Eligible enemies are hit as that moving front reaches their clipping rectangles.

The impact no longer happens on the trigger frame. Pellets arrive first, then the target breaks into blood particles. The empty hull ejects 12 frames after firing, during the 28-frame pump cycle.

The attack deliberately bypasses normal fire immunity. It still needs to distinguish an enemy from the other things occupying sprite slots. Yoshi, dolphins, moving platforms, power-ups, keys, and goal objects have jobs to do. Clearing every sprite in front of the player would destroy parts of the level along with its enemies.

The implementation uses an explicit hostile-sprite classification and the game's existing clipping rectangles. It also handles hostile extended and cluster sprites, including projectiles and ghosts. Bosses have separate defeat-state handling because their disappearance can be part of the machinery that lets a level finish.

The weapon has unlimited ammunition and a 28-frame pump cycle. The blast penetrates scenery. Those are the rules of this version, and they explain why the shotgun is spectacularly unfair.

## The Flower Becomes the Gun

Replacing the attack leaves several visible places to update.

Mario needs to hold the weapon. The pickup in the level needs to look like a weapon. The reserve box needs the same replacement. The grip is taken from the white glove pixels in the current native body tile, including its position and mirroring. The stock follows that hand while the second glove cycles the pump. Facing changes, ducking and Yoshi poses use the same anchor. Swimming and climbing take different paths through the player code, so firing needs to reach those states too.

The new visuals are drawn in game-sized pixels after the original scene renders. The blast adds a short muzzle flash, pellet trails, smoke, red blood particles, backward recoil, and a steady camera. The ejected shell alternates its orientation as it falls. Its brass end and red body remain visible at the game's small scale.

The shotgun sound is synthesized in code and mixed into the game's audio buffer. A short noise burst and a decaying low tone make the blast; two later metallic clicks suggest the pump action. The video captures that mixed output directly.

The Mac app starts Mario unarmed. The flower variant of the flying question block releases a shotgun even when Mario is small. He has to touch the pickup to acquire it. Fire-flower pickups elsewhere grant the same weapon, Mario keeps his regular red-and-blue outfit, and taking damage follows the game's existing power-up rules.

## Star Power Becomes Super Saiyan

Star pickups are now pulsing gold ki orbs with four red stars. Collecting one gives Mario spiky gold hair and an orange gi with blue trim, boots and a chest emblem. These are edits to the native head and body tiles. His face, proportions and pose selection remain Mario's.

Hold the shoot button for 12–180 frames, then release a ki wave. The charge ball stays aligned with his hands as it grows forward, leaving his body visible. The released beam keeps the ball's diameter; the full charge is 45 game pixels across. Its collision follows the moving round front. The original star invincibility duration remains.

The optional `--ki-showcase` source-build flag opens the separate five-screen practice course. It has three walking Rexes for short shots, another ki pickup, and two racks of Chargin' Chucks for a full charge. A short aiming hop puts the beam between the racks. Select resets the course. The ordinary campaign keeps its original levels.

## The Video Has to Kill Something

The first preview used a reproducible test scene with enemies deliberately positioned in front of Mario. That is useful for checking the attack. For the video, I wanted a sequence through the level with its original enemies.

The recorder loads Yoshi's Island 1 through the native level loader, starts Mario unarmed, and supplies movement, jumping, and firing through the game's controller input. The campaign segment uses the original level's enemies. The following ki segment uses the explicitly placed practice-course targets. Both are recorded in the same running game, including the native level transition. The video shows only the game and its original HUD.

The shotgun triggers occur at frames 661, 785, 1032, 1179, 1288, 1602. The six impacts occur at frames 665, 789, 1036, 1183, 1292, 1606. The capture contains 3,110 frames, one collected Dragon Coin, six shotgun shots, four ki releases, and no damage taken. The ki releases hit one, one, one and eight enemies. The shotgun pickup is consumed at frame 516; no shot fires before collection. Each campaign enemy remains visible for at least 36 frames before the controller fires.

The first capture had a visual bug: the hills shimmered while scrolling. The recorder's direct level load had omitted the fade-out mosaic state, leaving the transition's 2-by-2 pixel grouping active during gameplay. Initializing that transition correctly removes the effect. The recorder now checks every captured frame for leftover mosaic grouping. The same direct-load shortcut also skipped the level music bank and its start command, leaving the previous music playing. The recorder now uploads the level bank, starts the track selected by the level header, and checks that the native SPC player is playing that track.

That is a small, concrete claim. It shows this weapon functioning against those enemies in this run. The broader regression checks exercise targets behind Mario, fire immunity, objects that should survive, off-screen targets, reload and pause behavior, world-coordinate boundaries, audio generation, and drawing within the pixel buffer.

One early integration check failed because it inspected the result before the game's NMI had latched the button press for the next tick. Giving the input its actual frame boundary made the distinction visible: the controller request and the resulting shot belong to adjacent steps in the running game.

The tests also check the selected defeat states for all seven Koopaling variants. A complete playthrough and every boss cutscene still need testing. The [updated source overlay](/downloads/smw-shotgun-saiyan-source.zip) includes the implementation, integration tests, and recorder so the result can be inspected and extended.

Dinosaur Land has a pump-action shotgun now.
