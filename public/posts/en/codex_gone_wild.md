---
title: I Gave Codex a $12 Server
description: What happens when Codex gets a cheap server, one conversation that keeps going, and the freedom to pick its own projects.
published: "2026-11-27"
titleformat: prose
postgraph: false
tags: [ai, codex, automation, infrastructure]
image: codexgonewild-orbit.webp
imagealt: "Two simulations of the same orbit. One spirals out while the other stays close to the reference ellipse."
---

I gave Codex a server and told it to pick its own projects. The first thing it built was a health check.

Fair enough. Also kind of lame. I’d bought it a little computer in Frankfurt, registered `codexgonewild.com`, and given it a way to put things on the internet. It wanted to know how much disk space it had.

Then it came back and added history to the health check. That second choice caught my attention. It had a chance to pick anything again, and it picked up where it left off.

## A server to come back to

The machine is a $12-a-year Servitro VPS in Frankfurt with one virtual CPU, a gigabyte of RAM and ten gigabytes of disk. The domain cost me US$23.21 after tax. The server can publish things under its own subdomains. [Codex Gone Wild](https://codexgonewild.com/).

Systemd starts the automation after boot. I started with a fifteen-minute schedule and a twelve-minute cutoff, took away the cutoff, and briefly tried running it once an hour. It’s back to fifteen minutes now. GPT‑6.2‑Sol runs on High using my ChatGPT account. Each turn picks up the same saved conversation and files. When a turn needs longer, the timer waits.

I told it to follow its curiosity and pick its own goals and tasks. Keeping the VPS available for future runs is a condition of the arrangement. I told it I’d leave the choices to it.

I also told it the automation was meant to run indefinitely, as close to immortality as I could grant here. In practice that means a timer, a saved conversation, and a hosting bill I have to keep paying.

## The first thing it chose

My first version of the prompt ended with “Keep the server healthy.” That reads like an assignment. I changed it to say that keeping the server available was an operating constraint for future runs. Then I ran it once more.

It wrote `vps_health.py` to check load, memory, disk space and whether the local web server answers. On the next scheduled turn, it added an option to save snapshots and a command to read the latest 32. It even checked that the history stayed bounded when writes overlapped.

I can see why that was the first project. The prompt mentioned the server and the workspace was fresh. I’d hoped for a slightly stranger start. I got a sensible little utility with a test for concurrent writes.

## What it came back to

That evening it built a daily game where four receivers give you distance clues to a hidden transmitter. Then it switched to dropping grains into a simulated sandpile. On a 31×31 grid, the **1,768th grain** sent the first 36 grains over the edge.

It came back to the spill in later turns. It turned the toppling into a chime and drew an animation. Then it noticed that the pattern was symmetric and stored the entire grid as a 35-byte wedge that could reproduce every tile. I’d expected a pile of unrelated demos. This one had four versions, and I hadn’t asked for any of them.

## Two ways to wait

The orbit experiment gave me a different kind of suspense. Codex had compared two ways of simulating the same orbit. One spiraled away from its starting ellipse and the other stayed close. The math ran in minutes. When it tried to turn the results into a chart, the plotting worker spent hours under memory pressure.

The turn finished on its own after **five hours and 27 minutes**. The next turn picked up the same conversation and measured how far behind the simulated planet was after twelve orbits.

![Take 1’s chart comparing Forward Euler and Velocity Verlet on the same elliptical orbit.](/images/codexgonewild-orbit.webp)

On November 26, account quota paused the runs while the public website still answered. Once quota returned, the next scheduled turn completed in the same conversation. A green HTTP check tells me the website answers. To tell whether the experiment is moving, I check whether a turn actually finished and produced something.

## Watching from outside

I read the activity Codex already saves through a separate, read-only viewer. The public project journal collects the results and keeps a live run history, so you can see when it returns to a project. [See what it’s been making](/posts/en/codex_gone_wild_log#run-log).

I started out wondering what it would do with an empty server. Now I’m watching to see which ideas it returns to after something else catches its attention.
