---
title: "Your AI Company Doesn't Need an Org Chart"
description: "AI executives copy the shape of a human organization. Events, state, policies and explicit authority provide a more useful starting point."
titleformat: "prose"
published: "2026-11-14T09:17:00-05:00"
sourcesCheckedAt: "2026-11-13T01:02:33Z"
tags: ["ai", "architecture", "organizations", "skeuomorphism"]
---

Replacing every box on an org chart with an agent is organizational skeuomorphism.

An AI CFO. An AI product manager. An AI engineering department. We have taken the structure of a human company and reproduced it in software before asking which constraints still justify that structure.

Skeuomorphism borrows familiar real-world forms to make a new medium understandable. Digital folders resemble physical folders; an electronic notebook can imitate a paper one. The metaphor helps someone recognize the interface. It does not establish the best underlying architecture. [Nielsen Norman Group on skeuomorphism](https://www.nngroup.com/articles/skeuomorphism/)

An agent org chart applies the same habit to an institution. The familiar form is a management hierarchy. Instead of asking what information and authority a workflow requires, we appoint a virtual executive to hand work to another virtual executive.

That is the part worth challenging. Human departments accommodate limited attention, specialized expertise, working hours and communication overhead. Software still needs boundaries, but the useful boundaries concern state, permissions, failure isolation and independently verifiable results. A human reporting line does not automatically supply any of them.

Organizational skeuomorphism is my application of the design concept here, not a claim that every multi-agent system is poorly designed. Separate agents can provide useful specialization or isolation. The question is what justifies their separation. A familiar title is a weak answer.

Job titles can be useful interfaces. They tell a person where to send a question. They are much less useful as an answer to who may change a price, which facts a decision requires, or what happens when a workflow runs twice.

For repeatable operations, events, state, policies and tools provide a more useful starting point. A model belongs where interpretation or generation helps the work, with its authority expressed separately from its job title. [Anthropic's distinction between workflows and agents](https://www.anthropic.com/engineering/building-effective-agents) is useful here: orchestration and model-directed behavior are different design choices, not interchangeable names for automation.

## Describe the change you need

Consider a customer asking for a refund. A pretend finance department adds very little to the problem.

The system needs to know which purchase the request concerns, whether a refund already happened, what the current refund policy permits and whether the payment provider completed the action. Some requests fit the policy. Some require a person to decide.

That gives us a clearer sequence:

```text
Request arrives
    → establish purchase and current refund state
    → evaluate the applicable policy
    → perform a permitted action or request human review
    → verify the provider result
    → record the resulting state
```

A model might interpret the request or summarize a dispute. The authority to move money should come from enforced permissions and policy. Putting “follow the refund policy” in a prompt does not create that boundary.

This is familiar systems engineering. CloudEvents specifies a source and ID that consumers can use to recognize duplicate events. That does not automatically make a refund idempotent; the action still needs protection against duplicate execution. [CloudEvents specification](https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md)

Likewise, a policy decision needs a record. Open Policy Agent documents decision logs containing query inputs, policy and bundle metadata, with masking for sensitive fields. Those are useful building blocks for explaining what authorized an action without leaking the customer’s information. [OPA decision logs](https://www.openpolicyagent.org/docs/management-decision-logs)

Neither tool turns a company into an autonomous system. They illustrate the kind of contract that a job title fails to specify.

## Exceptions need a human with authority

“Human in the loop” can mean almost anything. A person clicking approve on a wall of generated text is not much of a control.

A useful exception has a reason: conflicting evidence, an action outside delegated authority, an uncertain customer identity, or a consequence the system cannot safely reverse. The person reviewing it needs the facts, the relevant policy, the proposed action and its consequences.

They also need the ability to reject it, correct the facts, request more information or change the policy through a separate process. Otherwise the human is providing ceremony rather than judgment.

An exception queue has capacity. If automation creates a hundred ambiguous cases a day and the operator can resolve ten, the business has automated the production of a backlog. Waiting time, repeated escalations and reversals matter as much as the number of actions completed automatically.

The operator must be able to pause a workflow and discover whether an external action actually happened. A payment timeout is not proof that the payment failed. Blindly retrying it can turn an infrastructure problem into a customer problem.

## Accountability survives automation

The phrase “the system owns the state transition” describes execution. It does not settle responsibility. Someone still owns the policy, the credentials, the customer commitment and the response when it goes wrong.

Some human organizational boundaries should remain software boundaries. Separation of duties, access restrictions and independent review exist for reasons beyond office hours or communication overhead. An agent that can propose an action need not hold the credentials to perform it.

My argument is narrower than abolishing management. Design the operational system around explicit changes and authority. Keep people accountable for what that system is allowed to do.

You can still call an interface “finance” if that helps someone use it. But underneath it, I want to see a state machine, a policy decision and evidence of the result. A digital executive giving another digital executive instructions is a much less convincing architecture.
