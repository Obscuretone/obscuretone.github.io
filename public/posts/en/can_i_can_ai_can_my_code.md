---
title: 52,000 Lines Of Policy In A Code Review
description: Checking pull requests against 52,000 lines of global corporate policy in real time, through an MCP server with three simple questions.
published: "2026-11-06"
tags: [software, ai, governance, code-review, systems, mcp]
---

I built something at work that I think is pretty cool: an MCP server that lets a code review check a proposed change against roughly 52,000 lines of global corporate policy, on the fly, while the review is happening.

Security, privacy, software delivery, AI governance. A whole body of organizational requirements that would otherwise depend on a reviewer knowing which documents to open and which sections to look for.

The interface has three commands:

1. **Can I do this?**
2. **Can AI do this?**
3. **Can my code do this?**

The implementation is work product, so I am keeping this at the level of the idea. But the idea is worth talking about. A pull request can now have the organization's policies available as part of the review itself.

## Fifty-Two Thousand Lines Is A Lot To Remember

A code reviewer already has a substantial job. Understand the change. Check the behavior. Think about failure. Notice the assumptions. Work out whether the tests actually establish what the author thinks they establish.

Corporate policy adds another dimension. A change can be technically sound and still conflict with a requirement that lives somewhere outside the repository.

At the scale of a global organization, that is a retrieval problem before it is a reasoning problem. You have to know that a relevant requirement exists, find it, and connect its language to the behavior of the proposed change. Being a good engineer does not give you an index of every policy document in your head.

Fifty-two thousand lines makes that limitation fairly concrete.

The useful question became: can I make those policies available to the review at the moment they matter?

## The Review Can Ask

The service brings policy search and evaluation into the development workflow through Model Context Protocol, or MCP. An AI-assisted review can consult it while examining a proposed change.

That makes a different interaction possible. The review has a specific piece of work in front of it. It can bring questions about that work to the policy service and use the relevant requirements as part of its assessment.

The policy check happens while the change is still open for discussion and revision. There is something concrete to evaluate, and there is still an opportunity to change it before merge.

That timing is a large part of why I find it useful. The distance between a written requirement and the engineering decision it should inform becomes much shorter.

It is also satisfying in a very ordinary way. There are 52,000 lines of policy. I am reviewing this change. I can ask about the connection right now.

## Three Questions Keep It Simple

The three commands describe different kinds of action.

**Can I do this?** starts with what the employee intends to do.

**Can AI do this?** asks about delegation. Whether a person may perform a task does not automatically settle whether an AI tool may participate or what information it may receive.

**Can my code do this?** asks about the behavior of the resulting software. This is the question that fits naturally into pull request review: does the proposed implementation satisfy the applicable corporate requirements?

The underlying policy collection is large. The interface does not need to be.

I like that the commands sound like questions somebody would actually ask. They give both a developer and a coding agent a straightforward way to approach a complicated body of rules.

## There Is Search And AI Underneath It

The service combines full-text search, vector retrieval, and AI-assisted interpretation across the policy collection. It also exposes deterministic evaluation tools for automated review workflows.

At a high level, the search methods help bridge the vocabulary gap. Sometimes the proposed change uses the same terms as the policy. Sometimes the relationship is expressed in different language. The service needs ways to find the relevant material in either case.

I am deliberately leaving the implementation there. The engineering result I care about is that the reviewer can consult the requirements during the review, without manually working through the entire collection.

There is still a distinction between finding relevant policy, evaluating a requirement, and establishing complete compliance. An automated review has limits, and an ambiguous requirement still needs someone responsible for interpreting it. The value is in making the applicable policy available and usable inside the decision.

## This Is A Useful Place For AI

A lot of attention goes toward how quickly AI can produce code. I find this application at least as interesting: helping review that code against the constraints of the organization that will operate it.

Working software has to fit its environment. Corporate requirements are part of that environment, alongside the existing architecture and operational expectations. Making them accessible during review gives the workflow more of the context it needs.

This has been effective in practice, and the scale is the part that still makes me stop and appreciate it. A reviewer does not have to carry 52,000 lines of global policy in their head to bring them into a discussion about a particular change.

They can ask while the pull request is open.

That is a pretty cool thing to be able to build.
