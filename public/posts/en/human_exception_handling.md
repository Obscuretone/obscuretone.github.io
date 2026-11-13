---
title: "Human Intervention Is an Exception Handler and Approval Is Not Enough"
description: "Human oversight requires evidence, authority and capacity. An approval button alone cannot establish control over an automated decision."
titleformat: "prose"
published: "2026-11-05T12:00:00-05:00"
sourcesCheckedAt: "2026-11-13T01:02:33Z"
tags: ["ai", "oversight", "operations", "human-factors"]
dateAssignedRetrospectively: true
---

A workflow that stops for human approval is not automatically well supervised. The person can receive incomplete evidence, face an impossible queue or lack the authority to change the proposed outcome.

In that situation the human is present but the control is weak. An approval button records a click. It does not establish informed judgment.

The useful design question is what the human can understand and do at the moment the system reaches its boundary. Treating intervention as exception handling makes that boundary explicit: why did ordinary execution stop, what state is the work in and which decision resolves the case?

## An exception needs a type

Not every difficult case is a confidence problem.

A missing purchase record is an information problem. Two contradictory records are an evidence problem. An action outside delegated permissions is an authority problem. A payment timeout is an outcome-uncertainty problem. A situation the policy does not cover is a judgment or policy problem.

These distinctions affect the response. Another model pass cannot create missing authority. A higher confidence score cannot establish whether a payment provider completed a request. More context can help interpret a policy without authorizing anyone to change it.

The system needs to preserve what it knows and what it attempted. Otherwise the human spends the review reconstructing a state that the automation should already represent.

## A timeout is not a failed payment

Suppose software submits a consequential action and loses the response. The provider may have acted. The internal process may have failed before dispatch. Those cases look similar to a component that sees only a timeout.

A useful exception contains the operation identity, attempted request, available provider evidence and the permitted reconciliation path. It does not arrive as a paragraph announcing that the action probably failed.

[Stripe's idempotency documentation](https://docs.stripe.com/api/idempotent_requests), [Stripe’s 2017 design explanation](https://stripe.com/blog/idempotency) shows why an external contract matters. A consistent idempotency key gives retries a defined meaning under the provider's rules. Inventing a new request identity because an earlier response is uncertain can discard that protection.

Likewise, a workflow engine's retry policy governs execution behavior; it does not decide whether an external action is appropriate. [Temporal's documentation](https://docs.temporal.io/encyclopedia/retry-policies) distinguishes retry settings for workflow and activity failures. The business still needs an interpretation of the action's state and authority.

## Give the person evidence and alternatives

The reviewer needs the underlying facts, not just the model's recommendation. They need to know which policy applies, why the ordinary path stopped, what the proposed action changes and what remains uncertain.

They also need meaningful choices: correct a fact, request information, reject, defer or take a different authorized action. If the interface offers only approve and the organization penalizes delay, the practical decision may already have been made elsewhere.

A source link can help, but a wall of links is not enough. The material evidence needs to be identifiable. The relevant purchase, provider response or policy version should be accessible without requiring the reviewer to search several disconnected systems.

[OPA decision logs](https://github.com/open-policy-agent/opa/blob/v0.63.0/docs/content/management-decision-logs.md) illustrate a useful technical foundation for preserving decision context. They also illustrate a privacy obligation: logging everything indiscriminately can retain sensitive inputs that do not belong in a general review record.

## Humans have failure modes too

Oversight is not a magical property added by involving a person. [Parasuraman and Riley's research on automation](https://journals.sagepub.com/doi/10.1518/001872097778543886) describes overreliance, monitoring failures and disuse associated with false alarms. Workload and the visibility of the system's state affect how people use it.

The implication for an AI workflow is direct: the operator's role deserves engineering. A plausible explanation can encourage acceptance even when the underlying evidence is weak. Repeated unnecessary escalations consume attention and can train someone to dismiss the next one.

This does not mean removing the human from consequential decisions. It means evaluating the actual review arrangement. Can the person recognize a bad recommendation? Do they have enough time? Can they challenge it? Does the system preserve the evidence required to do so?

A reviewer who approves everything quickly may be seeing excellent work. They may also be operating a rubber stamp. Approval rate alone cannot distinguish those explanations.

## Capacity is part of the control

An exception queue has arrivals, handling time and waiting work. If cases arrive faster than the operator resolves them, the queue grows. The consequences depend on what waits: a routine classification can tolerate delay differently from an account-access dispute.

As an illustration, 100 monthly exceptions taking 15 minutes each consume 25 hours before coordination and interruptions. Those are invented numbers, not a benchmark. They expose a resource that automation dashboards can hide.

[Google's discussion of operational toil](https://sre.google/sre-book/eliminating-toil/) is relevant here. Recurring manual work that scales with the service consumes the time available for lasting improvements. An exception that requires judgment can still reveal unnecessary system complexity rather than an intrinsically human task.

The right response is not always to broaden automated authority. Some causes are better removed: a missing validation, an ambiguous policy or a badly designed reconciliation process. Some cases genuinely deserve human discretion and remain reserved for it.

## Resolution is not delegation

A person can resolve one unusual case without authorizing software to handle its entire category. That distinction matters when interventions become training examples or operational rules.

An exception may reveal missing knowledge. It may reveal that the system correctly recognized the limit of its authority. Treating both as failures to automate encourages the system to erase a boundary that served its purpose.

The record needs to distinguish the lesson: correct the input, repair the workflow, clarify the policy or preserve a human decision. Any change to delegated authority is a separate decision with its own justification.

## Review the work that never escalates

An empty queue does not establish that automation is correct. It can mean ordinary work is handled well, or that important failures are not being detected.

Customer complaints, reversals, reconciliation and sampled outcome reviews provide evidence beyond the system's own decision to request help. The objective is informed control over consequences, not a low intervention percentage.

Human intervention works as an exception handler when the case has a defined state, the person has evidence and authority, and the resulting action has a verifiable outcome. Without those conditions, the human is the final person available to blame. Their presence in the loop changes the diagram more than it changes the risk.
