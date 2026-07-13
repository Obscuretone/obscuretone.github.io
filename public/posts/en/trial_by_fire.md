---
title: Tell Me About The Last Time Something Broke In Production
image: trial_by_fire.jpg
imagealt: The classic meme, a dog in a room on fire, "this is fine"
description: Production incidents are a real signal of engineering experience. The useful interview question asks what happened after something broke.
tags: [production, incidents, hiring, engineering, evidence]
---

One of my favorite interview questions is simple:

> Tell me about the last time something broke in production.

I do not like this question because I want to punish people for making mistakes.

I like it because production is where software stops being theoretical.

Local development is controlled. Tests are selective. Staging is a model. Production has real users, real data, real concurrency, real integrations, real permissions, real traffic, real money, and real organizational pressure.

If someone has worked on enough real systems, eventually something goes wrong.

The interesting question is whether they know what to do when the system proves them wrong.

## The Probability Of Never Shipping A Bug

Nobody has a universal statistic for "software engineers who have never shipped a bug." The honest way to think about it is probabilistic.

Assume:

1. an engineer ships \(n\) meaningful changes
2. each change has probability \(p\) of causing a production bug
3. the risks are independent enough for a rough model

The probability of shipping zero production bugs is:

$$
P(\text{zero bugs}) = (1 - p)^n
$$

So the probability of shipping at least one production bug is:

$$
P(\text{at least one bug}) = 1 - (1 - p)^n
$$

Now use a very generous assumption: only 1% of meaningful changes cause a production bug.

For 500 meaningful shipped changes:

$$
P(\text{zero bugs}) = 0.99^{500}
$$

$$
P(\text{zero bugs}) \approx 0.00657
$$

That is about:

$$
0.657\%
$$

So even under a forgiving model, the chance of making 500 meaningful production changes without ever causing a production bug is less than 1%.

Put differently:

$$
P(\text{at least one bug}) = 1 - 0.99^{500} \approx 99.343\%
$$

The exact numbers are debatable. The conclusion is sturdy. If someone has shipped enough real software, "nothing ever broke" is not a credible engineering story. It suggests lack of production exposure, lack of ownership, lack of memory, or an unusually narrow definition of "bug."

## This Is Signal

There is a bad version of this question:

> Have you suffered enough to be allowed in?

That version is useless.

The good version is:

> What did production teach you that tests, code review, and local development did not?

That is signal.

A production incident reveals how someone behaves when the abstraction leaks. It shows whether they can stay calm, gather evidence, communicate clearly, reduce blast radius, make reversible changes, and learn without hiding.

Those are real engineering skills.

## A Deliberately Lossy Filter

I have used this question as a real hiring filter.

If someone swears they have never broken production, I treat that as a fail.

Could that lose an amazing candidate? Yes. It probably loses someone. Maybe one in a hundred strong candidates has genuinely shipped meaningful production software for years without causing a production bug, or has a definition of "broke production" so narrow that their answer is technically true.

So be it.

Every hiring filter is lossy. The question is whether the signal is connected to the job.

Compared with the filters employers actually use, this one is defensible. Companies routinely make snap judgments from weaker proxies:

1. whether the resume has the exact keywords
2. whether the previous title matches the new title
3. whether the company names are recognizable
4. whether the degree came from the right school
5. whether the employment timeline looks conventional
6. whether the email domain looks "professional"
7. whether the resume format feels familiar

Some filters are worse than weak. They are discriminatory.

I have literally been in the room when gender was considered in a hiring conversation. I escalated it immediately because that is not a hiring signal. It is illegal, unethical, and corrosive to the entire process.

That experience is part of why I prefer a question like this. It points toward the work.

Production incidents are part of software engineering. How someone talks about them tells me more than a polished resume, a brand-name employer, a school, an email domain, or a rehearsed answer about strengths and weaknesses.

Find me a better filter that is actually available in a real interview, under real time constraints, with the information employers really use.

Until then, I will keep asking.

## Why Production Is Different

Some bugs only appear in production because production is not just another environment. It is a different kind of system.

Common production-only causes include:

1. **Scale:** data volume or traffic reveals performance issues
2. **Environment differences:** configuration, secrets, permissions, or infrastructure differs from staging
3. **Concurrency:** race conditions appear only under real load
4. **Real data:** user input is messier than test fixtures
5. **External dependencies:** vendors, networks, queues, and background jobs introduce timing failures
6. **Operational pressure:** fixes happen while people are waiting

This is why the question is useful in interviews. A person can memorize patterns, pass coding exercises, and explain best practices. Production asks whether they can operate inside a system that is already moving.

## What A Strong Answer Sounds Like

Strong answers are specific.

They usually include:

1. what changed
2. what broke
3. how the issue was detected
4. who was affected
5. what was done to mitigate it
6. how the root cause was found
7. what changed afterward

The best answers are not heroic. They are boring in the right way.

The engineer noticed evidence, narrowed the problem, communicated impact, chose a reversible mitigation, preserved information for root-cause analysis, and turned the incident into better tests, monitoring, design, or process.

That is what maturity looks like.

## A Useful Incident Story

One production issue I worked through involved a billing-like calculation system for field equipment with intermittent connectivity.

The system was eventually consistent and correct for the overwhelming majority of cases, but a subtle edge case appeared when an initial plan and a later revision interacted in an unexpected way.

The result was that a minimum usage charge could be calculated incorrectly. Most discrepancies were small, but some were large enough to require manual review.

The technical fix mattered, but the broader lesson mattered more: tests covered the expected paths, but not the lifecycle interaction that caused the issue.

The follow-up was to improve the test cases around revisions, make the calculation easier to reason about, and add checks that surfaced unusual billing outcomes earlier.

That is the kind of story I want to hear in interviews. Not perfection. Ownership, analysis, and improvement.

## What The Question Actually Tests

"Tell me about the last time something broke in production" is not a confession prompt.

It tests:

1. **Ownership:** Does the candidate take responsibility without becoming defensive?
2. **Judgment:** Can they explain tradeoffs under pressure?
3. **Systems thinking:** Do they understand why the issue happened beyond the immediate symptom?
4. **Communication:** Did they keep teammates, users, or stakeholders informed?
5. **Learning:** Did the incident lead to better tests, monitoring, process, or design?
6. **Humility:** Do they understand that real systems fail in ways no one fully predicts?

The red flag is the absence of ownership.

The red flag is "I have never been close enough to production to have a story," or "I have a story but learned nothing from it."

## Closing Thought

Breaking production is not a badge of honor.

Learning from production is.

The strongest engineers are not the ones who claim nothing ever goes wrong. They are the ones who can explain what happened, how they responded, and how the system became better afterward.

Production is not fair, but it is honest.

Eventually, it grades the assumptions.
