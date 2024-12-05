---
title: About This Site
description: obscuretone is a collection of systems notes, software projects, and essays on reliable systems, practical architecture, AI-assisted workflows, hiring systems, and the organizational incentives around software work.
---

obscuretone is a place for systems notes, software projects, and essays about technology, organizations, and the strange places where incentives turn into architecture.

The writing comes from a background in backend, full-stack, and embedded systems work: authentication and core services at very large scale, compliance tooling, incident management, QA process design, fleet management, industrial control interfaces, IoT connectivity, database performance, and the unglamorous work of making systems reliable enough for other people to depend on.

The posture is still engineering-shaped: how systems fail, how incentives shape behavior, how review and QA pipelines absorb change, and how technical decisions survive contact with production.

## What I Work On

The most useful way to understand my work is that I keep coming back to evidence, reliability, and feedback loops.

In production systems, that means asking what actually happened, what evidence we have, how the system failed, and what changed afterward. That is the thread behind [Tell Me About The Last Time Something Broke In Production](/posts/en/trial_by_fire), where I argue that incident stories are one of the better hiring signals because production eventually grades assumptions.

In engineering process, it means being suspicious of dashboards that replace judgment. [Pieces Of Flair](/posts/en/pieces_of_flair) is about metrics becoming the job: handle time, sprint velocity, Jira movement, office attendance, and every other proxy that starts as measurement and turns into performance theater.

In hiring, it means treating resumes and job descriptions as lossy artifacts instead of pretending keyword search is understanding. [The Ten-Second Resume Is An Advertisement](/posts/en/ten_seconds), [Job Not Found](/posts/en/jobnotfound), and [EMH - Building A Hiring Platform Around Evidence](/posts/en/inevitability) all circle the same problem from different angles: candidates are asked to compress complex work into instantly searchable signals, while employers often optimize for pile reduction instead of comprehension.

EMH is the software version of that argument. It started as an attempt to replace first-line HR keyword screening with something that could actually compare a resume and a job as evidence. Building it made the tradeoffs clearer: exhaustive LLM screening is expensive, but one-to-one comparison and evidence-grounded resume drafting are genuinely useful.

## Projects

I use side projects to explore systems at a scale where the whole shape still fits in one head.

[PyGameBoy](/posts/en/pygameboy) is a Game Boy emulator in Python, which makes performance tradeoffs very explicit: flat memory, opcode dispatch, NumPy rendering, and audio-clock synchronization all matter when CPython itself is part of the constraint.

[Nira](/posts/en/nira) is a local issue tracker designed for both humans and coding agents. It is interested in interface boundaries: a CLI-first command surface for automation, a web UI for human review, and SQLite state that stays with the workspace.

[The XKCD Tasks Meme As A Systems Test](/posts/en/xkcdmeme) is about turning the classic "is there a bird in a national park?" joke into an actual service using EXIF parsing, geospatial boundaries, and computer vision. It is small, but it captures how much leverage modern tooling can give a developer.

[Simple PAM](/posts/en/simple_pam) is a tiny authentication-boundary project: a Linux PAM module that uses recent uptime as a narrow physical-access signal. It is not a general security solution, but it is a useful reminder that authentication is policy expressed at a boundary.

I also have a collection of todo apps that I treat as architecture probes rather than products. The domain is intentionally boring, which makes framework choices, persistence models, runtime tradeoffs, and UI/API boundaries easier to compare.

## How I Think

I like practical architecture more than architecture theater.

I am interested in systems that can be operated, debugged, explained, and improved. That includes software systems, hiring systems, team processes, and occasionally public policy. [Should Canada Elect Senators?](/posts/en/government_control) applies control-loop thinking to Canadian government. [Could AI Govern?](/posts/en/hal_9000) uses a fictional AI sovereign as a harder test of intelligence than conversation alone. [Nova Scotia Should Be An Island](/posts/en/nova_scotia) is, technically, an infrastructure proposal.

The tone changes from post to post, but the habit is consistent: look at the system, identify the incentives, find the bottleneck, and ask what the current design is actually optimizing.

That is also how I approach engineering work. Good software is not just code that runs. It is code inside an operating system of people, processes, failures, constraints, and tradeoffs.

That is the part I find interesting.
