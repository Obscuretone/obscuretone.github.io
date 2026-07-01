---
title: Nira - Designing Tools For Humans And Agents
description: A project note on Nira, a local issue tracker built around a CLI for automation and agents, a web UI for humans, and SQLite state stored with the workspace.
---

[Nira](https://github.com/obscuretone/nira) is a local issue tracker for a single workspace. It has a command-line interface for automation and tool use, a local web UI for humans, and SQLite storage in the project directory.

The interesting part is not that it tracks tickets. The interesting part is the interface design question:

> What should a tool look like if both humans and coding agents need to use it comfortably?

Nira's answer is to expose a small, explicit command surface while keeping a browser UI for the parts humans prefer to browse, edit, and review visually.

## Why CLI-First Works For Agents

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

The value is not that a terminal is special. The value is that a CLI tends to force a stable contract.

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

## Local State Matters

Nira stores its data in `.nira/nira.db` inside the workspace. That makes the issue tracker local to the project rather than dependent on a hosted service.

That local model fits agent-assisted development well:

1. The tool can work without network access.
2. Project state lives beside project code.
3. Commands can be run from anywhere under the workspace.
4. The database can be inspected, backed up, or removed like any other local project artifact.

This is not a replacement for team-scale systems like Jira or GitHub Issues. It is a different shape: local, lightweight, and close to the work.

## Humans Still Need A UI

CLI-first does not mean CLI-only.

Humans often want to browse, scan, edit long text, and review related work visually. Nira includes a local web UI for that reason. The browser interface supports ticket lists, filtering, ticket detail pages, inline editing, related-ticket links, and Markdown editing.

That split is deliberate:

1. **CLI:** fast operations, automation, agent use, scripting.
2. **Web UI:** browsing, editing, review, and human comfort.
3. **SQLite:** durable local state behind both interfaces.

The goal is not to force humans to behave like scripts or force agents to use a human UI. The goal is to give each user the interface that matches the task.

## Interface Design Is The Product

For tools meant to be used by agents, interface design becomes part of the product. Ambiguous commands, unstable output, hidden state, and vague errors all make the tool harder to use reliably.

The same is true for humans, but agents make the problem easier to see. If an operation is hard for an agent to call safely, it is often also poorly specified for automation, testing, and integration.

That makes agent compatibility a useful pressure test for developer tools.

## Closing Thought

Nira is a small project, but it points at a larger design pattern.

Agent-friendly software does not require exotic interfaces. It requires boring, dependable ones: clear commands, clear schemas, clear errors, inspectable state, and operations that do what they say.

A CLI is one good way to get there. A well-designed API can get there too. The deeper lesson is to treat the interface as a contract, not an afterthought.
