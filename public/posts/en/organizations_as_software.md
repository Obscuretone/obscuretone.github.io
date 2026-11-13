---
title: "Organizations Are Becoming Software and Their Rules Need Versions"
description: "Executable business rules need versions, evidence, ownership and recovery plans because changing software can change what an organization permits."
titleformat: "prose"
published: "2026-11-04T12:00:00-05:00"
sourcesCheckedAt: "2026-11-13T01:02:33Z"
tags: ["organizations", "software", "policy", "architecture"]
dateAssignedRetrospectively: true
---

A refund policy is a business decision. When software applies it, it is also an executable rule governing how the company treats a customer.

That rule has inputs, an effective date, an owner and consequences. It can be changed, misapplied or implemented incorrectly. A customer can dispute its result. Treating it as a paragraph in an agent's context does not resolve any of those obligations.

This is the substantive meaning of organizations as software: operational commitments become explicit state transitions with rules about who or what may cause them. The organization still supplies the goals and accepts responsibility. Software supplies an increasingly large part of the execution.

## There is a history before agents

Businesses have expressed processes in software for decades. Accounting systems, workflow engines and enterprise applications already coordinate work and enforce rules. [BPMN](https://www.omg.org/spec/BPMN/2.0.2/About-BPMN) formalizes ways to describe business processes, events and interactions. An AI label does not make process modelling a new invention.

What changes with language models is which inputs and tasks can enter an automated process. A customer writes an ambiguous request. A model extracts candidate facts or proposes an answer. Another component retrieves authoritative records. A policy determines which action is permitted.

These parts do not need the same failure model. Language interpretation can remain uncertain while the authority to change a financial record remains explicit. [Anthropic's distinction between workflows and agents](https://www.anthropic.com/engineering/building-effective-agents) supports a useful design question: which steps benefit from model-directed behavior, and which deserve a predictable path?

The architecture becomes weaker when everything is reduced to agents exchanging instructions. A conversation can carry information, but it does not by itself define the authoritative state or the conditions under which money moves.

## State is what the company believes happened

Consider a refund request. The company needs to distinguish a request received, a decision made, an action submitted and an action confirmed. These are not synonyms for done.

If a provider response is lost, the internal record may be uncertain while the external action has already happened. The system needs a way to reconcile those two states. Retrying a request without that distinction can create a duplicate action.

The details are familiar distributed-systems problems. [CloudEvents](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md) supplies an identity convention that consumers can use to recognize duplicate events. [Stripe](https://docs.stripe.com/api/idempotent_requests), [Stripe’s 2017 design explanation](https://stripe.com/blog/idempotency) documents a provider-specific idempotency contract. Neither eliminates the need to define what a business action means and how its result becomes authoritative.

The organizational consequence is important: somebody must decide which evidence settles a dispute between internal belief and external reality. That responsibility exists whether the person performing the reconciliation is an employee, the founder or software operating within delegated authority.

## History is different from current state

A current record can say that a refund is complete. It may not explain why it was approved, which policy governed it or whether the decision was later corrected.

[Martin Fowler's account of event sourcing](https://martinfowler.com/eaaDev/EventSourcing.html) distinguishes storing current state from preserving the sequence of changes that produced it. Not every business needs a fully event-sourced architecture. The underlying question still matters: can the organization explain how it reached its present position?

An operational history also has limits. Replaying old inputs under a new policy does not recreate what the company knew at the time unless that information was preserved. A log full of generated explanations is not equivalent to a record of the actual evidence and authority used.

That is why the policy version belongs alongside the decision. [Open Policy Agent's decision logs](https://github.com/open-policy-agent/opa/blob/v0.63.0/docs/content/management-decision-logs.md) provide a concrete example: inputs and bundle metadata can be recorded, with masking for sensitive fields. The organization still has to decide which information is necessary, who can inspect it and what retention is appropriate.

## A policy deployment is a business change

Suppose a refund window changes. Which requests receive the new rule: those submitted after its effective time, those processed after it, or those associated with purchases made under the new terms?

This is a business decision before it is an implementation detail. Fetching the latest document is not an answer. Nor is asking a model to choose the most reasonable interpretation after a customer complains.

A controlled change states the intended behavior and makes it testable. Boundary cases matter: a request at the cutoff, missing purchase evidence, an earlier partial refund or a request already waiting for review. Tests can establish whether the implementation follows those rules. They do not establish whether the rules are fair or authorized.

The distinction also affects rollback. Reverting software does not retrieve a sent email, reverse a completed payment or undo the customer's experience. A business change therefore needs an account of actions already taken, not merely a previous version of code.

Durable workflow systems address execution history, retries and recovery, but business correctness still depends on the application contract. [Temporal's retry documentation](https://docs.temporal.io/encyclopedia/retry-policies) is useful precisely because it describes defined execution behavior rather than treating every failure as an invitation to improvise.

## Permission is part of the process

A component able to recommend a refund does not automatically need the credentials to execute it. A component permitted to execute a refund does not automatically need the authority to change the refund policy.

Those separations preserve the difference between interpreting an instance, acting within a rule and rewriting the rule itself. Naming one agent CFO can obscure all three powers inside a familiar title.

The organization-as-software argument therefore does not remove accountability. It makes the allocation of authority more explicit. A person or institution remains responsible for the constraints, the access granted and the response when those constraints produce a bad outcome.

## The hard boundary is the promise to the customer

An automated organization is still an organization making promises. Customers care whether a purchase works, a commitment is honored and a mistake is corrected. They do not care how many internal agents collaborated on the result.

Expressing those obligations in software creates a useful pressure toward clarity. Hidden discretion, informal exceptions and contradictory policies become implementation problems that cannot be solved by a more fluent summary.

The company gains consistency where its rules are clear and speed where its processes are dependable. It also concentrates the consequences of a bad rule: software can apply a mistake efficiently across many cases.

Organizations as software is therefore a governance argument as much as an automation argument. The code has versions because the behavior changes. The policies need versions because the commitments change. The responsibility for both remains with the people who authorize the operation.
