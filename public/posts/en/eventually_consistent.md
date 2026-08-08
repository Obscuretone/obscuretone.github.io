---
title: "await jobMarket.converge();"
titleformat: code
image: rt_eventual_hiring_sync.webp
imagealt: "Recruiters, candidates, budgets, job postings, and calendars appear as delayed database nodes trying to sync."
imagecaption: "Hiring as stale replicated state: every node updates eventually, and candidates wait in the lag."
imagesource: "AI-generated illustration created for obscuretone with OpenAI image generation."
description: "Hiring behaves like a badly replicated distributed system: postings, recruiters, candidates, managers, budgets, and ATS records all drift out of sync, and candidates pay for the inconsistency."
tags: [hiring, distributed-systems, careers, incentives, software]
---

The modern job market behaves like a badly replicated distributed system in which every participant reads from a different copy of reality.

The job posting says one thing. The recruiter says another. The hiring manager wants something narrower. The compensation band has changed. The ATS still contains the old title. The internal candidate already exists. The business need is urgent until finance freezes the req.

Then the candidate is asked to treat the process as rational.

The system may eventually converge, but often only after the candidate has applied, interviewed, waited, followed up, rewritten their resume, questioned their own judgment, and been ghosted by a no-reply address with brand guidelines. Hiring is eventually consistent, but the consistency arrives too late to be useful.

The numbers help explain why visible demand is not the same thing as a usable hiring pipeline.

In the United States, the [Bureau of Labor Statistics reported](https://www.bls.gov/news.release/jolts.nr0.htm) 7.6 million job openings and 5.2 million hires in May 2026. BLS defines the first as positions open on the last business day and the second as additions to payroll over the entire month. They are a stock and a flow, not a numerator and denominator. The figures show a large, active labour market; they do not tell us how many postings were stale or how likely any one applicant was to be hired.

In Canada, [Statistics Canada reported](https://www150.statcan.gc.ca/n1/daily-quotidien/251216/dq251216a-eng.htm) 492,500 job vacancies in the third quarter of 2025, down from a second-quarter 2022 peak of 985,900. For jobs requiring a bachelor's degree or higher, the unemployment-to-vacancy ratio rose to 6.1, up from 5.1 a year earlier.

That is the job market candidates are trying to debug: aggregate demand that says little about any particular posting, alongside far more people chasing each credible professional role in parts of the Canadian market.

## The Posting Is A Stale Read

A job posting looks like a source of truth but often behaves like a cached artifact. It may have been copied from an older role, edited by HR, softened by legal, inflated by a hiring manager, keyword-stuffed by a recruiter, and posted after the team's needs already changed.

That is how a backend role accumulates frontend requirements. That is how a mid-level role asks for staff-level judgment. That is how a job requiring deep production experience gets described with a cheerful paragraph about learning opportunities.

The posting may be sincere while remaining partially true in several incompatible directions, a harder failure to detect than a simple falsehood.

Candidates respond to the artifact they can see. They tailor resumes to the visible requirements, write cover letters to the stated mission, and prepare stories for the listed responsibilities.

When they discover the actual role during the interview, the system has served them a stale read.

## Recruiters Query An Index

Recruiters are often blamed personally for this, but the role itself is structurally strange.

They are asked to search for people without always having direct access to the work. They get keywords, years of experience, location constraints, salary bands, availability targets, and a description of the person the hiring manager thinks they want.

That is querying an index, with all the distance from the real job that implies.

An index is useful. It helps find candidates quickly. It supports filtering, ranking, and rough matching. But an index is not the source record. It does not contain the full context of the team, the technical debt, the political constraints, the production risks, or the actual reason the role exists.

Candidate conversations can therefore feel surreal: the recruiter asks about terms while the candidate tries to describe work, and those are different protocols.

If the right acronym appears, the conversation moves forward. If the candidate has equivalent experience under different names, the system may fail to join the records.

The candidate may have done the work even when the index does not know how to find it.

## Candidates Write To A Queue With No Ack

Applying for a job is a write operation.

The candidate sends a resume, answers questions, maybe attaches a cover letter, and submits the application into an employer-owned system.

In a well-designed system, a write returns an acknowledgement. It tells the caller what happened:

1. accepted
2. rejected
3. queued
4. duplicate
5. invalid
6. missing required information
7. unavailable because the resource no longer exists

Hiring usually returns:

> Thank you for your interest.

That response is a postcard from the void.

The candidate does not know whether the role is active, whether the resume parsed correctly, whether the application reached a human, whether the posting has an internal candidate, whether the salary range is real, or whether the company is collecting resumes for a role it may never fill.

Candidates respond by retrying: they apply again, message recruiters, rewrite bullets, change titles, increase volume, ask friends for referrals, and treat silence as a signal because the system refuses to produce one. Employers then complain about candidate volume even though the queue is full of retries caused by missing acknowledgements.

## Ghosting Is Packet Loss With Corporate Branding

Ghosting is usually discussed as a manners problem, but it is also a reliability problem.

Somewhere in the process, a state transition happened. The candidate was rejected, the role paused, the manager disappeared, another candidate accepted, the recruiter left, the req closed, the interview feedback never arrived, or the team simply stopped caring.

The candidate sees none of those transitions because the message is dropped.

Because the message is dropped, the candidate has to keep state locally. They maintain spreadsheets, calendar reminders, email threads, recruiter names, job IDs, salary ranges, interview notes, and emotional guesses about whether silence means no, maybe, or "we are just busy."

The arrangement is absurd: the employer owns the process but offloads state management to the applicant.

Even worse, the dropped message is often wrapped in politeness. Companies describe silence as high volume, careful process, or an inability to provide individual updates. Some of that is true. None of it changes the user experience.

From the candidate's side, the packet was lost and the company merely put a logo on the loss.

## Fake Jobs Are Cache Poisoning

Many bad postings are merely stale, aspirational, duplicated, paused, underfunded, already filled, or waiting for an internal candidate to clear process. From the outside, those distinctions barely matter because every version poisons the cache.

Candidates cannot reliably tell which postings represent real demand. A listing may be active because the company genuinely needs someone. It may be active because the company wants a pipeline. It may be active because HR forgot to close it. It may be active because the company wants to look like it is growing. It may be active because the role exists in theory but no one has permission to hire.

The visible job market becomes contaminated by records that look valid but do not behave like real openings.

Exhausted job seekers have data behind the paranoia. [Greenhouse's 2024 State of Job Hunting report](https://www.greenhouse.com/blog/greenhouse-2024-state-of-job-hunting-report) said 18-22% of jobs posted on its platform in a given quarter were classified as ghost jobs, and that three in five candidates suspected they had encountered one.

That uncertainty breaks trust. Once candidates believe a meaningful percentage of postings are not real, they rationally apply more broadly, spend less time on each application, use automation, and stop treating individual postings as worthy of careful attention.

Employers then receive lower-quality applications and conclude that candidates are careless, overlooking how the system trained that behaviour.

## Hiring Managers Arrive Late

The person who best understands the role often enters the process too late.

By the time a hiring manager looks closely, the posting may already be public, recruiters may already be screening, candidates may already be eliminated, and the process may already be optimizing for the wrong signals.

This creates a familiar failure mode:

1. the posting asks for a broad profile
2. the recruiter screens for visible keywords
3. the candidate presents relevant but imperfect evidence
4. the hiring manager finally clarifies the real requirement
5. everyone discovers they were matching against the wrong shape

The role did not change; its source of truth arrived late.

This is especially damaging for senior or unusual candidates. Their value often lives in judgment, recovery, architecture, tradeoffs, operations, mentorship, or problem framing. Those signals are hard to screen from a keyword index and easy to lose before the hiring manager sees them.

Many processes claim to want senior judgment while filtering primarily on junior-legible keywords.

## The Candidate Is Also Inconsistent

Employers do not own the whole mess because candidates are inconsistent too.

They maintain multiple resume versions. They compress experience differently for each role. They omit relevant work because it does not fit the page. They exaggerate the visible parts because the process rewards visibility. They apply to roles that are adjacent, aspirational, or merely tolerable because the market has become too noisy to reward precision.

Candidates are adapting as participants in the same distributed system, not becoming dishonest as a class.

The resume is a replica of the person's work history. It is lossy, stale, and optimized for the reader expected to consume it. The job posting is a replica of the employer's need. It is also lossy, stale, and optimized for the market expected to consume it.

Then both sides compare the replicas and act surprised when reality fails to match.

## Eventual Consistency Fails People

Eventual consistency is useful in software when the system can tolerate temporary disagreement, which hiring often cannot.

A candidate cannot wait forever for the posting, budget, recruiter, hiring manager, ATS, interview loop, and business need to converge. They have rent, timelines, competing interviews, visa constraints, family obligations, and finite emotional bandwidth.

Employers have constraints too: they need people, process, legal caution, and protection against overfitting to the loudest candidate or most polished resume. Hiring will always contain uncertainty.

Hiring hides too much of that uncertainty from the people most affected by it. A distributed system can be eventually consistent and still terrible to use when callers cannot observe state, retry safely, or understand failure.

## Better Consistency

Perfect transparency would be a bad promise.

Companies will never expose every internal discussion, and they should not. Candidates will never submit a complete representation of themselves, because such a document would be unreadable, invasive, and likely to include information employers should neither request nor use.

The system could still be much more honest about state.

Employers could expose basic process facts:

1. whether the role is actively funded
2. whether interviews are currently happening
3. whether an internal candidate is in process
4. whether the posting is evergreen or immediate
5. whether the salary range is approved
6. whether remote, hybrid, or location constraints are hard requirements
7. whether the candidate is rejected, queued, or still under review
8. whether rejection was caused by fit, timing, compensation, level, or process closure

None of that requires a soul-baring confession from the hiring team; it requires treating candidates like callers of a real system.

## Where Software Could Help

This is the part that keeps pulling me back to hiring software.

Bad keyword tools are only one symptom. The system lacks a shared model of evidence and state.

A better hiring platform would reconcile replicas:

1. the job description as written
2. the hiring manager's actual requirements
3. the recruiter's screening criteria
4. the candidate's resume evidence
5. the interview rubric
6. the current state of the req
7. the reasons candidates moved forward or stopped

Software can help identify where the records disagree without being given authority to make the hiring decision.

If the posting says Python and the hiring manager means production Django at scale, that mismatch should be visible. If the recruiter rejects a candidate for missing Kubernetes but the role only needs container literacy, that should be visible. If the candidate's resume implies relevant incident-response experience without using the expected term, that should be visible.

Hiring software should do more than rank people by making inconsistency inspectable.

## Closing Thought

The job market can fail even when every participant behaves rationally, because each one acts against stale, partial, and incompatible state.

Candidates optimize resumes for systems that barely acknowledge them. Recruiters search indexes that flatten work into terms. Hiring managers clarify requirements after screening has already happened. Companies leave stale postings online and call the resulting mess a talent market.

Eventually, the truth may emerge: the role was paused, the range was wrong, the requirement was different, the manager wanted someone else, the posting was stale, or the candidate was qualified for a job that existed only in the cache. By then, the damage is already done because eventual consistency has left people waiting too long for convergence.
