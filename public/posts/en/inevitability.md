---
title: EMH - Building A Hiring Platform Around Evidence
image: resume_mr_anderson.webp
imagealt: Neo sees a resume review through the lens of the Matrix
description: EMH started as an attempt to replace keyword-based first-line HR screening, then evolved into an evidence-grounded platform for comparing one resume to one job and generating application-specific resume drafts.
tags: [hiring, ai, evidence, software, resumes]
---

Most recruiting software still carries too much 1990s thinking.

Boolean searches, keyword filters, and crude applicant tracking screens treat a resume like a bag of terms. If the right acronym appears, the candidate survives. If the same experience is described in different language, they may disappear.

That was the original frustration behind [EMH](https://github.com/obscuretone/emh).

I started it while unemployed and tired of hearing the same recruiting advice: make the resume instantly searchable, mirror the job description, include the right keywords, assume nobody has time to infer anything.

Some of that advice is practical. The part that bothered me was the implied product failure. Candidates were being told to reshape their work around recruiter shortcuts because the screening layer could not reliably understand evidence unless it arrived in the exact expected wording.

I wanted to replace first-line HR screening with something that actually understood the resume.

Not "understood" in the mystical sense. Understood in the practical sense: what work did this person do, what skills does that imply, what evidence exists, what is missing, and how does that compare to the job?

Most AI hiring advice collapses that into a prompt.

Paste in a resume. Paste in a job description. Ask the model whether the candidate is a fit.

That can be useful, but a software system needs memory. It should remember what evidence was used, distinguish missing information from a weak score, separate recruiter matching from applicant optimization, and explain how a tailored resume was grounded in actual work history.

EMH is my attempt to treat that problem as a platform problem instead.

![Neo sees a resume through the lens of the matrix](/images/resume_mr_anderson.webp "The Matrix")

## The Core Idea

A resume is a snapshot of a person's work history.

A job description is a snapshot of an employer's requirements.

Hiring software usually pretends those two documents can be compared directly, but that hides most of the interesting complexity. A resume is incomplete. A job description is aspirational. Both are written for humans, but both are increasingly processed by machines.

EMH turns those documents into structured evidence.

The system ingests resumes, parses work history, extracts skills, stores canonical profile jobs, imports job descriptions, evaluates required skills, and builds application-specific views of the match between a person and a role.

The original premise was more aggressive: AI should be able to replace the first pass that keyword searches and Boolean queries currently perform badly.

The current premise is more precise: AI can help surface and organize the evidence that a person or recruiter would otherwise evaluate inconsistently, but the economics and architecture matter.

## The Scaling Problem

Comparing one resume to one job is the easy part.

That is exactly where EMH is useful. A one-to-one comparison gives the system enough context to reason carefully about evidence, missing information, transferable skills, and role-specific fit.

The harder problem is exhaustive search.

If you try to compare every candidate against every job in a deep, LLM-mediated way, the token cost grows asymptotically with the size of the search space. The more complete you want the understanding to be, the more expensive the matching layer becomes.

That does not make the idea useless. It changes where the idea is strongest.

EMH may not be the right shape for brute-force screening across a huge database of candidates and jobs. It is much more compelling as a precise comparison engine:

1. this resume against this job
2. this profile against this role
3. this application against this requirement
4. this candidate's evidence against this specific set of skills

That is still a real product. It just moves the center of gravity from "replace the entire first-pass recruiting funnel" toward "make each important comparison much better."

## Two Products In Tension

One of the most important lessons from building EMH is that applicant tooling and recruiter tooling are not the same product.

They are not even trying to optimize the same thing.

The applicant wants a careful reading. They want the system to understand the full shape of their experience, notice transferable skills, and avoid throwing them away because the exact keyword was missing.

The recruiter usually wants enough qualified candidates to fill the pipeline. When a posting has hundreds or thousands of applicants, the incentive is not to understand every resume deeply. The incentive is to reduce the pile quickly, find a workable shortlist, and move on.

That is the uncomfortable truth behind a lot of resume advice. Much of it teaches people how to survive a lazy first-pass filter.

I do not mean lazy as a personal insult. I mean structurally lazy. The process rewards shallow elimination because shallow elimination is cheap, and once there are enough apparently qualified candidates, the marginal value of carefully reading the next resume drops.

The applicant side asks:

1. What is the strongest honest application this person can submit for this job?
2. Which parts of their experience should be foregrounded?
3. Which missing or weak signals should be addressed directly?
4. What resume draft best reflects the relevant evidence?

The recruiter side asks:

1. Which known candidates are closest to this job?
2. Which skills are covered, missing, or unknown?
3. Which applicants already exist for this role?
4. Which profiles should be hydrated or evaluated next?

Those goals overlap, but they are not identical. The applicant-facing system wants to present one person as clearly as possible. The recruiter-facing system wants a more neutral comparison across many people.

More bluntly: the applicant wants maximum understanding; the recruiter often needs only sufficient confidence.

That is why keyword search survives. It is a bad model of human ability, but it is a cheap model of pile reduction.

That tension shaped the architecture. EMH keeps recruiter matching and application-specific resume generation as related but separate read models over the same underlying evidence.

It also explains the product pivot. Recruiter matching is still interesting, especially when the candidate pool is bounded or when missing evidence can be hydrated intentionally. But the strongest path may be applicant-side: use the one-to-one comparison to build the best honest application for a specific role.

## Missing Is Not Zero

This sounds small, but it matters a lot.

If a resume does not mention a skill, that does not always mean the person lacks it. It may mean the resume was written for a different role, the skill was implied by a project, or the parser has not evaluated the relevant work history yet.

EMH treats missing evidence as a distinct state from a weak rating.

That design choice makes the system more honest. Unknown skills should often trigger more evaluation, not silently become a zero in a score. This matters especially in senior hiring, where strong candidates often have transferable experience that is not phrased in the employer's exact language.

## Overlap Beats Generic Scores

I do not like hiring systems that reduce a person to a mysterious percentage.

EMH uses overlap as the main user-facing concept. Instead of asking "is this candidate a 78?", it asks how much of the job shape is covered by known evidence.

That distinction handles cases that generic scores often get wrong.

A person can be overqualified without being a worse fit. A missing required skill can matter more than several nice-to-have strengths. A shallow keyword match can look impressive while still failing to cover the actual role.

The goal is to make the comparison inspectable: show the skill evidence, the gaps, the overlap, and the explanation.

## Evidence-Grounded Resume Drafts

The most useful part of EMH may not be simply matching a profile to a job. It may be using that match to generate an application-specific resume draft from evidence the system can trace.

That flow matters because a tailored resume is easy to do badly.

The naive version gives an LLM the whole profile and asks for a better resume. That is where hallucinated achievements, exaggerated scope, and generic language creep in.

EMH is designed around a stricter path:

1. build a canonical profile from the uploaded resume
2. evaluate the job description and required skills
3. snapshot the profile and job at application time
4. retrieve candidate bullets from the profile evidence
5. rank bullets against the application skills
6. generate a targeted draft from that candidate set
7. keep source bullets and covered skills inspectable

That makes the draft more useful because it rewrites known evidence instead of producing free-floating persuasion.

This is where the original screening idea turns into a resume-writing product. If the system can understand why a resume does or does not match a job, it can also help rewrite the resume so the real match is visible.

The system already rewards presentation. The useful version of EMH makes the presentation clearer without inventing experience.

## The Platform Work

The part I am proud of is not that EMH calls an LLM. Calling an LLM is easy.

The harder work is everything around it:

1. a React frontend for profiles, jobs, applications, prompt editing, and queue inspection
2. a Sanic backend with MySQL, Redis, MinIO, and Tortoise models
3. resume upload and canonical profile synchronization
4. job import, skill extraction, and skill evaluation
5. recruiter-side matching for unapplied profiles
6. applicant-side job applications with frozen profile and job snapshots
7. a durable database-backed workflow queue for long-running LLM work
8. idempotency keys, leases, retries, dependency waits, and provider rate-limit coordination
9. a queue dashboard that shows stuck work, blockers, retries, completions, cooldown state, and task history
10. versioned prompt templates editable from the application

That is the difference between a demo and a platform. The product problem is whether the system can produce, store, inspect, retry, and explain the work.

## Why This Matters

Hiring is full of lossy translation.

Candidates translate work into resumes. Employers translate needs into job descriptions. Recruiters translate both into shortlists. Automated systems translate everything into tokens, keywords, vectors, scores, filters, and too often, Boolean searches.

EMH is a way to make that translation less opaque.

For applicants, it asks: what is the strongest truthful version of this application?

For recruiters, it asks: what evidence do we actually have, what is missing, and who appears closest before we pretend the answer is certain?

For the platform itself, it asks: where is expensive reasoning worth spending?

That is a more interesting problem than resume prompting. It combines product design, backend architecture, AI orchestration, retrieval, queue reliability, data modeling, and user-facing explanation.

## Closing Thought

The original version of this post was about using AI to stress-test a job application.

That is still useful, but EMH is the bigger answer. It takes the same instinct and turns it into software: freeze the evidence, separate the viewpoints, make the reasoning inspectable, and generate application-specific material without losing the connection to the underlying work.

The project started with a bigger ambition: replace first-line keyword screening with real resume understanding. Building it made the limits clearer. Exhaustive AI screening can become expensive quickly. One-to-one comparison is where the system becomes practical, explainable, and immediately useful.

If AI is going to be involved in hiring, confident answers are the least interesting part.

The important question is whether the system can show its work.
