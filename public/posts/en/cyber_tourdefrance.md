---
title: AI Changed The Bar
image: rt_ai_code_review_queue.webp
imagealt: "An engineer reviews a growing queue of AI-generated code printouts moving through QA gates."
imagecaption: "AI makes the first draft cheaper and pushes the bottleneck into review, testing, and accountability."
imagesource: "AI-generated illustration created for obscuretone with OpenAI image generation."
description: A 2026 retrospective on AI-assisted software development, arguing that cheaper first drafts move the real bottleneck into review, QA, and accountability.
tags: [ai, software, engineering, review, accountability]
---

When AI coding tools first became useful, the obvious question was whether they would replace software developers. A more useful question was who would get the most leverage from the tool.

The answer, at least so far, depends on the task and the system around it. AI is easiest to use safely when the person or team can evaluate the output. It can generate boilerplate, draft tests, summarize unfamiliar code, explain APIs, and propose implementations quickly. The generated text has value, but durable leverage comes from knowing what to accept, what to reject, and what still needs to be reasoned through.

AI can do useful work. The modern problem is that it can create more work than the existing QA, review, and deployment pipelines were designed to absorb.

AI therefore has not removed the need for strong developers; it has changed the bar for what strong development looks like.

## The Original Claim

The original version of this argument compared AI to a performance enhancer for developers. That analogy was imperfect, and one part of the claim was too broad. The evidence does not establish that the most experienced developer always receives the largest speedup. It does suggest that understanding the work changes what a user can safely do with cheap generated code.

AI does not turn an inexperienced developer into a senior engineer. It may help a newer developer substantially on a bounded task, and it may give an experienced developer a faster way to explore options or generate drafts. Neither result removes the need to judge the output in context.

Review makes the difference. A senior developer can look at AI output and ask:

1. Does this fit the architecture?
2. Is the error handling correct?
3. What assumptions did it make?
4. What security or privacy issue did it miss?
5. Is this maintainable?
6. Did it solve the actual problem or merely produce plausible code?

That review step is where experience matters.

## The Adoption Happened

By 2025, AI-assisted development was no longer a novelty. The [Stack Overflow 2025 Developer Survey](https://survey.stackoverflow.co/2025) reported that 84% of respondents were using or planning to use AI tools in their development process, and 51% of professional developers were using them daily.

Developers also reported real personal productivity effects. Stack Overflow found that roughly 70% of AI agent users agreed agents reduced time spent on specific development tasks, and about 69% agreed they increased productivity.

That matches what many developers experienced directly: AI is excellent at shrinking the first draft cost of code, documentation, tests, scripts, examples, and API glue.

But adoption is not the same thing as trust.

The same Stack Overflow survey found that more developers actively distrusted AI tool accuracy than trusted it: 46% distrusted the output, compared with 33% who trusted it. Only about 3% reported high trust. Experienced developers were especially cautious.

That is the shape of the current reality: developers use AI because it is useful, but they do not trust it enough to remove human accountability.

That mismatch matters. If a team doubles the amount of code it can produce but keeps the same review capacity, the same test coverage, and the same release discipline, the organization has not doubled its engineering capacity. It has moved the bottleneck downstream.

## Productivity Is Conditional

The most important thing current research adds is nuance.

Early controlled work on GitHub Copilot showed large gains on bounded tasks. In one [controlled experiment](https://arxiv.org/abs/2302.06590), developers asked to implement a JavaScript HTTP server completed the task 55.8% faster with Copilot. The authors also found heterogeneous effects that suggested possible benefits for people entering software development.

But real software work is not always a bounded greenfield task. Mature codebases require context, conventions, tests, review, deployment awareness, and knowledge of what not to change.

That is where the picture gets complicated. In 2025, [METR ran a randomized controlled trial](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) with experienced open-source developers working on their own repositories. In that setting, AI tools made developers slower by about 19%.

That result was surprising but plausible. In mature systems, AI can generate work that looks useful while creating review, correction, and integration costs. The time saved writing code can be lost checking whether the code should exist.

METR later noted in a [2026 update](https://metr.org/blog/2026-02-24-uplift-update/) that the 2025 result had become out of date quickly. Developers had become more reluctant to work without AI, task selection changed, and newer agentic tools made the effect harder to measure. Their later data suggested speedups may have emerged, but the measurement itself had become more difficult because AI changed how developers choose and perform tasks.

AI productivity cannot be reduced to a single number because it depends on the task, the developer, the codebase, the tool, the review standard, and the organization around it.

## AI Amplifies The System

The [2025 DORA report](https://dora.dev/research/2025/dora-report/) put the issue well: AI acts as an amplifier. It magnifies an organization's existing strengths and weaknesses.

That matches the practical experience of AI-assisted development.

On a strong team, AI can accelerate useful work because the surrounding system catches mistakes:

1. clear architecture
2. good tests
3. strong review culture
4. observable production systems
5. small batch sizes
6. clear ownership

On a weak team, AI can accelerate noise:

1. larger diffs
2. more duplicated code
3. plausible but wrong implementations
4. shallow tests
5. review fatigue
6. faster accumulation of technical debt

AI does not fix a bad engineering system. It makes the system move faster. Whether that is good depends on where it is pointed.

## The Review Bottleneck

The review bottleneck feels like the most current part of the argument. AI makes it easier to produce code, but code production was never the only constraint in software engineering and was often not even the most important one.

The real constraints were things like:

1. understanding the existing system
2. deciding whether the change should exist
3. reviewing edge cases
4. checking security and privacy implications
5. maintaining test quality
6. validating production behavior
7. keeping the architecture coherent over time

AI can help with some of that work, but it also creates more of it.

That is the uncomfortable operational problem: AI can increase implementation throughput faster than review throughput. A developer with an assistant can open more pull requests, produce larger diffs, generate more tests, and explore more variants. But every accepted change still has to pass through human judgment, automated checks, QA environments, deployment processes, monitoring, and rollback plans.

If those systems do not scale, AI does not create a clean productivity gain. It creates queueing pressure.

The resulting failure mode looks ordinary:

1. pull requests get larger
2. reviewers skim more
3. generated tests assert implementation details
4. subtle regressions survive because everything looks plausible
5. QA spends more time validating behavior they did not help shape
6. teams merge changes they understand less deeply
7. production becomes the first environment where the full interaction is tested

That argues against measuring AI success only by how quickly code appears.

The better question is whether the whole delivery system can safely absorb the increased rate of proposed change. If AI increases output but the review, test, QA, and observability layers stay fixed, the team may simply be moving faster toward uncertainty.

In that world, the valuable engineer can design the validation path around AI-written code.

## The Junior Developer Problem

The harder long-term issue is what happens to the work that used to train junior developers.

A lot of early-career learning came from routine implementation: small features, test updates, bug fixes, migrations, documentation, and glue code. AI is increasingly good at those tasks. That makes teams more productive in the short term, but it can also remove the apprenticeship path.

If junior developers are not given real work because AI can draft it faster, they lose the chance to build judgment. But if they use AI without enough review, they may ship code they do not fully understand.

That means teams need to be more intentional about mentorship, not less. The entry-level role may need to shift toward:

1. reading and explaining code
2. writing tests with clear intent
3. reviewing AI-generated changes
4. tracing production behavior
5. making small changes under supervision
6. learning how to reject plausible wrong answers

AI changes the training problem. It does not remove it.

## The New Skill Is Accountability

The central question is no longer:

> Can AI write code?

It plainly can. The better question is:

> Who is accountable for the system?

If an AI-generated change breaks production, leaks data, weakens security, or silently corrupts a workflow, the responsibility still belongs to the people and organization that accepted it.

That makes engineering judgment more important. The durable skills are the ones AI cannot own for you:

1. understanding the problem
2. choosing the right abstraction
3. knowing the codebase context
4. recognizing risk
5. reviewing tradeoffs
6. communicating uncertainty
7. operating the system after it ships

AI can help with many of those tasks, but it cannot be accountable for them.

## Closing Thought

The early performance-enhancer analogy held up only after moving it up a level. AI can amplify people and teams capable of using it well, but experience alone does not tell us who will receive the largest measured speedup.

AI made routine work cheaper, first drafts faster, and code generation less scarce. It also made review, judgment, architecture, QA, and accountability more important. The bottleneck moved from typing code toward knowing what code should exist, whether the generated version is good enough, whether the delivery system can validate it, and what happens when it reaches production. That is the new bar.
