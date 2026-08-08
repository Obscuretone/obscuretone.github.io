---
title: "metric.optimize() !== system.improve()"
titleformat: code
image: rt_flair_metric_dashboard.webp
imagealt: "Workers wear excessive badges while managers watch handle-time clocks, attendance turnstiles, sprint tokens, and velocity gauges."
imagecaption: "Metrics become the costume, and the costume becomes the work."
imagesource: "AI-generated illustration created for obscuretone with OpenAI image generation."
description: Measurement is useful until the metric becomes the job. This article looks at handle time, engineering dashboards, OKRs, and return-to-office mandates as examples of numbers replacing judgment.
tags: [metrics, incentives, management, systems, work]
---

I came across a tagline for a marketing research company called *L'Observateur*: "Tout ce que l'on mesure s'améliore."

Translated loosely, everything that is measured improves. The line sounds true because measurement can focus attention, reveal patterns, and show whether a change helped or hurt; without it, teams are guessing.

The more complete and less comforting version is that everything measured gets optimized.

Whether it improves depends on whether the metric is connected to the thing people actually care about.

## The Metric Becomes The Job

The flair joke in *Office Space* works because the workplace has confused visible compliance with actual value. The employee is technically meeting the stated requirement, but the manager still wants more enthusiasm, more performance, more proof that she has internalized the metric.

Bad measurement starts as a proxy for the work, becomes the work, and eventually persuades people to optimize their appearance inside the reporting system rather than the outcome.

This is the warning behind [Goodhart's Law](https://en.wikipedia.org/wiki/Goodhart%27s_law), especially the formulation popularized by Marilyn Strathern in ["Improving ratings"](https://journals.sagepub.com/doi/10.1177/135638909700300102):

> **When a measure becomes a target, it ceases to be a good measure.**

[Campbell's Law](https://jmde.com/index.php/jmde_1/article/view/297/) says the same thing in institutional terms: the more a metric is used to make decisions, the more pressure there is to corrupt the process being measured.

That sounds abstract until you have lived inside one of those systems.

## Handle Time

During university, I worked in consumer technical support.

One of the key metrics was average handle time. On the surface, that made sense. Shorter calls can mean faster service, lower queue times, and better operational efficiency.

I was good at the job, knew the tools and products, and had enough experience to solve common issues quickly. That became a problem when my handle time was flagged for being too short rather than too long.

The explanation I was given was:

> You are creating an unrealistic expectation of future support capabilities.

That sentence has stayed with me because it is such a pure example of measurement replacing judgment.

The customers were getting helped. The queue was moving. The work was being done. But the metric wanted the appearance of standardized effort more than it wanted the outcome the metric supposedly represented.

The metric made the perverse response obvious: an agent could improve their score by adding dead time without improving support.

That is the part that matters. The system could not distinguish better support from better compliance with the metric. Once the metric became the target, wasting time became a rational way to satisfy it.

## Engineering Dashboards

Software teams are not immune to this. We just use more expensive dashboards.

Lines of code, ticket counts, Jira comments, pull-request volume, story points, sprint velocity, review counts, deployment frequency, and incident counts can all be useful in narrow contexts. None of them is engineering value.

Numbers can be real and still misleading. A developer can write a lot of code in the wrong direction, a team can close tickets while accumulating technical debt, and a sprint can look predictable because scope disappears whenever new work appears. A director can produce a beautiful dashboard proving the organization is busy while every engineer underneath knows the work is getting worse.

That is the bleak little magic trick of bad metrics: they convert local dysfunction into executive confidence.

I have seen reporting systems where the visible numbers mattered more than the underlying reality. Comments existed because comments were counted. Ticket movement mattered because ticket movement was visible. Rework disappeared because the definition of rework was convenient.

The dashboard was not measuring the work. The work was being reshaped to satisfy the dashboard.

## The Zero-Sum Part

Metrics often create hidden tradeoffs.

When support agents are judged mainly on handle time, deep troubleshooting loses to fast closure. Ticket throughput makes invisible maintenance lose to visible output, sprint predictability makes honest uncertainty lose to scope manipulation, and office occupancy makes effective remote work lose to badge swipes. The measured thing improves because something else pays for it.

That is why "everything that is measured improves" is too naive. A metric can improve by pushing damage somewhere the dashboard does not look.

## OKRs Are Not Magic

Objective and Key Results are supposed to avoid some of this by connecting work to outcomes instead of activity.

That is a good instinct. Measuring "features shipped" is weaker than measuring whether those features improved activation, reliability, retention, or support load.

But OKRs do not automatically fix the problem. They can become pieces of flair too.

If the organization treats OKRs as a performance theater, people will learn to write safe objectives, negotiate easy key results, and tell success-shaped stories at the end of the quarter.

The hard part is whether the organization can tolerate honest measurement, regardless of framework.

Can it look at a missed target and ask what was learned, or does it need someone to blame?

Can it accept that an important project may reduce future risk without creating a clean short-term graph?

Can it distinguish "we changed the number" from "we improved the system"?

If not, OKRs become a more sophisticated way to count flair.

## Return To Office

Return-to-office mandates are a clean modern example of mismatched measurement.

Office attendance, badge swipes, and empty real estate are easy to measure, count, and see. Executives can look at occupancy and feel that something concrete has improved.

But the outcomes companies usually claim to care about are harder to measure:

1. productivity
2. retention
3. communication quality
4. delivery speed
5. focus time
6. team trust
7. access to talent

When organizations optimize for visible presence, they may improve the office-utilization metric without improving the work. A six-month randomized trial of 1,612 employees found that a two-day hybrid schedule [reduced attrition without damaging measured performance](https://www.nature.com/articles/s41586-024-07500-2), although one company and one hybrid arrangement cannot settle every workplace question.

The trial leaves the universal remote-work question open. Attendance remains a proxy rather than an outcome, and treating presence as productivity makes the same category of mistake as treating call length as support quality or Jira movement as engineering value.

It rewards the visible signal because the real signal is harder to capture.

## What Good Measurement Looks Like

Good metrics work as instruments rather than scoreboards.

They should help people ask better questions:

1. Why did cycle time increase?
2. Are incidents clustering around a subsystem?
3. Did this feature reduce support load?
4. Are customers succeeding faster?
5. Is review latency slowing delivery?
6. What behavior does this metric encourage?
7. What damage could this metric hide?

The last two questions are the ones organizations skip. Every metric is also an incentive, and every dashboard is a theory of what matters; even when that theory is wrong, people will optimize for it and may be rewarded for doing so.

## Closing Thought

Measurement is necessary, but it is not judgment.

Metrics are lossy representations of reality. They can reveal the system, or they can become a costume the system wears to look healthy.

When a workplace starts rewarding the costume, people notice. They learn what is actually valued. They stop asking what would improve the work and start asking what will improve the number.

That is how you end up with more pieces of flair, longer support calls, cleaner dashboards, fuller offices, and worse outcomes.

Everything measured is certainly measured, but that does not mean it improved.
