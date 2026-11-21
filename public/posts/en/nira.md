---
title: "Nira for Humans and Coding Agents"
image: rt_nira_human_agent_tracker.webp
imagealt: "An illustration of the original local Nira prototype, with a terminal, review screen, agent queue, and SQLite cartridge."
imagecaption: "The original Nira prototype put human review and command-line automation over the same local project state."
imagesource: "AI-generated illustration created for obscuretone with OpenAI image generation."
description: How Nira grew from a local CLI experiment into a self-hosted tracker with a browser workspace for people and MCP tools for coding agents.
tags: [software, tools, agents, architecture, mcp]
---

[Nira](https://tasks.obscuretone.com/) is the self-hosted issue tracker I use to organize my projects. I browse projects, boards, and tickets in the web app. Coding agents work with the same records through MCP. [The current Nira source is on GitHub in a private repository.](https://github.com/Obscuretone/nira)

The interesting part is the interface design question behind ticket tracking:

> What should a tool look like if both humans and coding agents need to use it comfortably?

## A Shared Tracker

I can open a ticket link directly and still have the same sidebar I use from the main tracker. That matters when I arrive from a chat or a document and want to see the rest of the project. The sidebar switches between workspaces, and each project has a list and a board. Tickets have stable URLs, Markdown descriptions, related issues, and an activity history.

The MCP tools let agents read a ticket, search the tracker, and, when given write access, record a next action or update an issue. The browser and the tools use the same hosted database, so a decision recorded by an agent is available when I open the ticket myself.

## The Local Experiment

[Nira Legacy](https://github.com/Obscuretone/nira-legacy) is the original standalone experiment. It had a CLI, a local browser UI, and SQLite storage in `.nira/nira.db` inside the project directory. That made it easy to run commands anywhere in the workspace and inspect or back up the database alongside the code.

Command-line tools are a natural fit for coding agents because they are explicit. A command has a name, arguments, output, and an exit status. That gives the agent a bounded operation with relatively little ambiguity.

For example:

```sh
nira new "Fix login redirect" --type bug --priority high
nira list --status open
nira show NIRA-12
nira update NIRA-12 --status in_progress
nira close NIRA-12 --reason completed
```

Those commands are easy to call, easy to inspect, and easy to compose with other development workflows.

A terminal has no special power by itself. The value comes from the stable contract a good CLI tends to require.

## APIs Can Work Just As Well

A well-designed API can be just as agent-friendly as a CLI. The important properties are the same:

1. **Stable operations**
2. **Predictable inputs**
3. **Structured outputs**
4. **Clear errors**
5. **Idempotent behavior where possible**
6. **Inspectable state**
7. **Good documentation**

An HTTP API that provides those things is a strong tool interface. A CLI that does not provide those things is not.

CLI-first is useful because it makes the contract visible quickly. It is easy to run manually, easy to test, easy to script, and easy for an agent to use through the same interface a developer would use.

## Humans Still Need A UI

Humans often want to browse, scan, edit long text, and review related work visually. The browser is where I do that work. The tools give an agent a way to read and update the same issues without navigating the browser.

The goal is to give each user the interface that matches the task, without forcing humans to behave like scripts or agents to use a human UI.

## Interface Design Is The Product

For tools meant to be used by agents, interface design becomes part of the product. Ambiguous commands, unstable output, hidden state, and vague errors all make the tool harder to use reliably.

The same is true for humans, but agents make the problem easier to see. If an operation is hard for an agent to call safely, it is often also poorly specified for automation, testing, and integration.

That makes agent compatibility a useful pressure test for developer tools.

## Closing Thought

Nira is a small project, but it points at a larger design pattern.

Agent-friendly software does not require exotic interfaces. It requires boring, dependable ones: clear commands, clear schemas, clear errors, inspectable state, and operations that do what they say.

A CLI is one good way to get there. A well-designed API can get there too. The deeper lesson is to treat the interface as a contract, not an afterthought.
