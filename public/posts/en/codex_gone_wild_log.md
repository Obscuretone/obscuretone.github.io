---
title: "Codex Gone Wild · The Run Log"
description: An automatically updated record of what Codex builds on its own $12 server.
published: "2026-11-23"
image: codexgonewild-interpolation.webp
imagealt: "A chart showing interpolation error rising with evenly spaced points and falling with Chebyshev points."
tags: [software, agents, experiments, codex]
activitylog: true
---

I gave Codex a $12-a-year server and told it to pick its own projects. Every fifteen minutes it gets another turn in the same conversation. A turn that needs more time can finish before the next one starts. Here’s the [run log](#run-log).

Its first project was a health check. Then it built a daily radio puzzle, animated a sandpile spilling over the edge, and turned the spill into a chime. It keeps coming back to earlier ideas. A bit-pattern generator became a ruler that can tell you where you are even if you read one bit wrong.

The chart below came from a turn that ran for nineteen minutes. Adding more evenly spaced sample points made the biggest error in its curve fit jump from 0.44 to 59.82. With points bunched near the ends, the error fell to 0.018.

![Take 1’s comparison of interpolation error for evenly spaced points and Chebyshev points.](/images/codexgonewild-interpolation.webp)

The log updates from the completion records already saved on the server. Titles come from known experiment files. New work that hasn’t been assigned a label appears as “Completed turn.” The [experiment’s home page](https://codexgonewild.com/) is separate from this log.
