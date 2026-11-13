---
title: "Your AI Rewrote the Code and the Behavior Still Needs Checking"
description: "A working TypeScript-to-Rust proof of concept generates inputs and executes both implementations to confirm supported behavioral differences."
titleformat: "prose"
published: "2026-11-12T20:33:27-05:00"
sourcesCheckedAt: "2026-11-13T01:02:33Z"
tags: ["software", "ai", "testing", "semantic-diff"]
dateAssignedRetrospectively: false
---

Yes: the implemented Semantic Diff approach works for its tested scope. It identifies supported TypeScript-to-Rust fallback mismatches, generates candidate inputs and confirms behavioral differences by executing both implementations. The preserved corpus records all 20 known regressions as confirmed differences and all 20 preserving controls as matching on the tested candidates. [Code](https://github.com/Obscuretone/obscuretone-semantic-diff), [execution evidence](https://github.com/Obscuretone/obscuretone-semantic-diff/blob/fd825887c1052d73260b8a420ee073ce7e883d8a/evidence/RESULTS.md)

That answers the original feasibility question. Combining language-aware analysis with targeted execution is practical. The result does not establish a general detector for arbitrary migrations or a proof of program equivalence.

A migration can preserve the shape of a function and change what it does. A default value is enough to demonstrate it.

Consider these expressions in two explicitly paired functions:

```typescript
return x || 10;
```

```rust
x.unwrap_or(10.0)
```

Assume the TypeScript input is a number, null or undefined. Assume the Rust value is the standard library's `Option<f64>`, with nullish inputs mapped to `None` and present numbers mapped to `Some`.

Now pass a present zero. TypeScript returns 10. Rust returns zero. The expressions look like two ways of supplying a default. Their default conditions are different. [JavaScript logical OR](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR), [Rust Option](https://doc.rust-lang.org/std/option/enum.Option.html#method.unwrap_or)

The useful question is whether a tool can find a candidate like that and make both implementations run. That is the bounded problem behind [ObscureTone Semantic Diff](https://github.com/Obscuretone/obscuretone-semantic-diff).

## Three different claims

Parsing two functions establishes their syntax. Normalizing supported expressions can expose a difference in their fallback conditions. Executing both functions can establish that a particular input produces different recorded outputs.

Those are different claims, and the tool reports them separately. A static warning predicts a possible mismatch. A confirmed difference requires successful execution of both implementations. A compiler error or runner timeout is inconclusive, not a counterexample.

The existing zero-count fixture records the distinction concretely. Its source-bound assumptions identify the primitive types, the standard library method and the input mapping. The report records a warning before execution. In the preserved Docker run, zero, negative zero and NaN produce different observations. [Recorded example](https://github.com/Obscuretone/obscuretone-semantic-diff/blob/fd825887c1052d73260b8a420ee073ce7e883d8a/evidence/example.json)

This is why a generic tree comparison is insufficient. It needs to preserve the meaning of operations that look similar. It also needs to know when it lacks enough information to assign that meaning.

## Assumptions are part of the result

The MVP uses explicit fixture assumptions. It is not a compiler-backed resolver for arbitrary applications. A method spelled `unwrap_or` does not establish standard-library identity by itself. A declared mapping between JavaScript values and Rust options does not establish that a real migration uses that mapping.

The report therefore includes its assumptions and source hashes. They make the conclusion inspectable, not assumption-free. A reviewer still needs to decide whether the fixture represents the code and input domain they care about.

The implementation deliberately supports a narrow syntax subset and literal fallbacks. That matters because apparently similar operators can also differ in evaluation order and side effects. Unsupported code should produce an explicit limitation rather than a plausible-looking answer. [Repository scope and resolution contract](https://github.com/Obscuretone/obscuretone-semantic-diff#resolution-is-mandatory)

## What the evidence actually shows

The preserved hosted validation for commit `99ca92d1c11cd336bc224e99c82ad67962db9025` records 179 passing tests in each of two jobs: Python 3.11 with trusted local Node/Cargo execution and Python 3.13 with Docker execution. Both corpus reports record 20 confirmed regression fixtures and 20 controls with no difference observed on their candidates. [Validation evidence](https://github.com/Obscuretone/obscuretone-semantic-diff/blob/fd825887c1052d73260b8a420ee073ce7e883d8a/evidence/RESULTS.md)

That is evidence for a focused synthetic correctness corpus. It is not a measured detection rate on production migrations. The tests were designed around the supported rules, and passing controls does not prove equivalence for every input.

The evidence also preserves incomplete macOS Docker attempts. Hosted success does not erase a host-specific runner limitation. Keeping those results is useful: an inconclusive result tells you where verification stopped.

## The result is a counterexample you can inspect

The repository contains the declared assumptions, source, actual inputs and observations. Its reports distinguish a static warning, a confirmed difference, matching candidates and inconclusive execution. The evidence includes the unsuccessful host attempts as well as the successful hosted jobs.

That makes the answer stronger than a claim that cross-language AST comparison sounds possible. There is working code and an executed counterexample. The useful result is a bounded, reproducible explanation of a particular behavioral change, with an explicit account of what was checked. AI makes a rewrite cheap enough to attempt; it does not remove the need for that contract.
