---
title: What Todo Apps Are Good For
description: A project note on using deliberately small todo applications to compare frameworks, persistence models, runtime choices, and architecture tradeoffs.
---

Todo apps are not interesting because the domain is interesting. The domain is intentionally boring.

That is the point.

A todo app gives you a fixed problem shape: create, read, update, delete, maybe authenticate, maybe group tasks, maybe expose a UI. Because the product problem is simple, the architecture becomes easier to compare.

I have a handful of todo repositories, and they should not each pretend to be a major product. They are better understood as architecture probes: small projects built to test how different stacks feel when solving the same basic problem.

## Why Repeat The Same App?

Repeating the same simple app across stacks removes noise.

When the domain stays constant, differences become easier to see:

1. How much framework setup is required?
2. How does the stack handle persistence?
3. How much ceremony exists around routing and validation?
4. How easy is local development?
5. How natural are tests?
6. What does deployment look like?
7. Where does the stack become awkward?

That kind of comparison is hard when every project has a different domain.

## Examples

[todo-enterprise](https://github.com/obscuretone/todo-enterprise) is a deliberately overbuilt Spring Boot API using Oracle, Redis, Maven, and Docker Compose. It is useful for looking at enterprise Java shape: dependency injection, profiles, JPA, containerized dependencies, and conventional service layering.

[todo-roadrunner](https://github.com/obscuretone/todo-roadrunner) explores a high-performance PHP path with RoadRunner, PostgreSQL, Redis, UUIDs, and separate read/write database connections. It is a useful contrast against traditional request-per-process PHP because the runtime model changes the performance and lifecycle assumptions.

[todo-mainframe](https://github.com/obscuretone/todo-mainframe) is the intentionally strange one: a modern REST and HTMX facade backed by COBOL business logic running inside an emulated Hercules/MVS mainframe. The useful idea is not that todos need COBOL. It is that legacy integration often looks like this in miniature: modern edges, old core, fixed-width records, transaction shims, and host-owned business rules.

[CBC-Todo-App](https://github.com/obscuretone/CBC-Todo-App) is a more conventional full-stack example with a React frontend, Sanic API, MariaDB persistence, JWT authentication, and Docker Compose. It is useful as a baseline for a runnable product-shaped app.

[todo-sanic](https://github.com/obscuretone/todo-sanic) focuses on a Python API with authentication, projects, subtasks, pagination, and task splitting through a language model. It is closer to testing how quickly an async Python service can grow beyond CRUD.

[todo-mets](https://github.com/obscuretone/todo-mets) is a small MongoDB, Express, TypeScript, Prometheus, and Grafana stack. It is useful for looking at the minimum shape of a typed Node service with observability attached.

## The Mainframe Version Is The Most Interesting

The mainframe todo app is absurd on purpose, but the architecture maps to real work.

Many organizations have modern APIs wrapped around systems that still own the business rules. The modern layer cannot simply reimplement the legacy logic without creating consistency problems. It has to submit work to the old system, parse results, manage failure, and present a cleaner interface to users.

That is exactly what `todo-mainframe` models:

```text
Browser / REST client
  -> Express REST + HTMX facade
  -> transaction gateway
  -> emulated card-reader path
  -> Hercules MVS
  -> COBOL transaction program
  -> fixed-width card-image storage
  -> spool result parsing
  -> HTTP response
```

It is a toy domain, but the integration pattern is real.

## What These Projects Show

Taken together, the todo apps are less about task management and more about engineering comparison:

1. **Runtime models:** JVM, PHP workers, Node, Python async, and emulated mainframe execution.
2. **Persistence choices:** Oracle, PostgreSQL, MariaDB, MongoDB, Redis, fixed-width files, and in-memory local modes.
3. **Operational shape:** Docker Compose, health checks, local development paths, and smoke tests.
4. **Architecture boundaries:** where business logic lives, how APIs expose it, and what happens when the backing system is unavailable.
5. **Developer experience:** how much work it takes to get from blank repo to working service.

That makes them useful as small comparative studies.

## Closing Thought

A todo app is not a product story. It is a constraint.

Used well, that constraint makes architectural tradeoffs easier to see. The value is not in the task list. The value is in making different stacks solve the same problem and observing what each one makes easy, awkward, fast, slow, explicit, or hidden.
