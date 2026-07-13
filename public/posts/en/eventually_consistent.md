---
title: The Job Market Is Eventually Consistent
image: rt_eventual_hiring_sync.webp
imagealt: "Recruiters, candidates, budgets, job postings, and calendars appear as delayed database nodes trying to sync."
imagecaption: "Hiring as stale replicated state: every node updates eventually, and candidates wait in the lag."
imagesource: "AI-generated illustration created for obscuretone with OpenAI image generation."
description: "Hiring behaves like a badly replicated distributed system: postings, recruiters, candidates, managers, budgets, and ATS records all drift out of sync, and candidates pay for the inconsistency."
tags: [hiring, distributed-systems, careers, incentives, software]
---

The modern job market behaves like a badly replicated distributed system.

Every participant is reading from a different copy of reality.

The job posting says one thing. The recruiter says another. The hiring manager wants something narrower. The compensation band has changed. The ATS still contains the old title. The internal candidate already exists. The business need is urgent until finance freezes the req.

Then the candidate is asked to treat the process as rational.

Eventually, the system may converge.

Unfortunately, it often converges after the candidate has already applied, interviewed, waited, followed up, rewritten their resume, questioned their own judgment, and been ghosted by a no-reply address with brand guidelines.

That is the problem.

Hiring is eventually consistent, but the consistency arrives too late to be useful.

The numbers support that distinction between visible demand and actual hiring.

In the United States, the [Bureau of Labor Statistics reported](https://www.bls.gov/jlt/) 7.594 million job openings in May 2026 and 5.170 million hires. That is not a one-to-one conversion rate because openings are a stock and hires are a monthly flow, but the gap still matters: the public sees millions of openings while candidates experience a market where many visible opportunities do not become jobs.

In Canada, [Statistics Canada reported](https://www150.statcan.gc.ca/n1/daily-quotidien/251216/dq251216a-eng.htm) 492,500 job vacancies in the third quarter of 2025, down from a second-quarter 2022 peak of 985,900. For jobs requiring a bachelor's degree or higher, the unemployment-to-vacancy ratio rose to 6.1, up from 5.1 a year earlier.

That is the job market candidates are trying to debug: visible openings, fewer hires than the postings imply, and far more people chasing each credible professional role.

## The Posting Is A Stale Read

A job posting looks like a source of truth.

It is usually not.

It is a cached artifact. It may have been copied from an older role, edited by HR, softened by legal, inflated by a hiring manager, keyword-stuffed by a recruiter, and posted after the team's needs already changed.

That is how a backend role accumulates frontend requirements. That is how a mid-level role asks for staff-level judgment. That is how a job requiring deep production experience gets described with a cheerful paragraph about learning opportunities.

The posting is not necessarily false.

It is worse than false.

It is partially true in several incompatible directions.

Candidates respond to the artifact they can see. They tailor resumes to the visible requirements, write cover letters to the stated mission, and prepare stories for the listed responsibilities.

Then, in the interview, they discover the actual role.

The system has served them a stale read.

## Recruiters Query An Index

Recruiters are often blamed personally for this, but the role itself is structurally strange.

They are asked to search for people without always having direct access to the work. They get keywords, years of experience, location constraints, salary bands, availability targets, and a description of the person the hiring manager thinks they want.

That is querying an index, with all the distance from the real job that implies.

An index is useful. It helps find candidates quickly. It supports filtering, ranking, and rough matching. But an index is not the source record. It does not contain the full context of the team, the technical debt, the political constraints, the production risks, or the actual reason the role exists.

This is why candidate conversations can feel surreal.

The recruiter is asking about terms.

The candidate is trying to describe work.

Those are different protocols.

If the right acronym appears, the conversation moves forward. If the candidate has equivalent experience under different names, the system may fail to join the records.

The candidate did the work.

The index did not know how to find it.

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

That is a postcard from the void.

The candidate does not know whether the role is active, whether the resume parsed correctly, whether the application reached a human, whether the posting has an internal candidate, whether the salary range is real, or whether the company is collecting resumes for a role it may never fill.

So candidates retry.

They apply again. They message recruiters. They rewrite bullets. They change titles. They increase volume. They ask friends for referrals. They treat silence as a signal because the system refuses to produce one.

Then employers complain about candidate volume.

The queue is full of retries caused by missing acknowledgements.

## Ghosting Is Packet Loss With Corporate Branding

Ghosting is usually discussed as a manners problem.

It is also a reliability problem.

Somewhere in the process, a state transition happened. The candidate was rejected, the role paused, the manager disappeared, another candidate accepted, the recruiter left, the req closed, the interview feedback never arrived, or the team simply stopped caring.

The candidate sees none of that.

The message is dropped.

Because the message is dropped, the candidate has to keep state locally. They maintain spreadsheets, calendar reminders, email threads, recruiter names, job IDs, salary ranges, interview notes, and emotional guesses about whether silence means no, maybe, or "we are just busy."

That is absurd.

The employer owns the process but offloads state management to the applicant.

Even worse, the dropped message is often wrapped in politeness. Companies describe silence as high volume, careful process, or an inability to provide individual updates. Some of that is true. None of it changes the user experience.

From the candidate's side, the packet was lost.

The company just put a logo on the loss.

## Fake Jobs Are Cache Poisoning

Not every bad posting is fake.

Some are merely stale, aspirational, duplicated, paused, underfunded, already-filled, or waiting for an internal candidate to clear process.

From the outside, those differences barely matter.

They all poison the cache.

Candidates cannot reliably tell which postings represent real demand. A listing may be active because the company genuinely needs someone. It may be active because the company wants a pipeline. It may be active because HR forgot to close it. It may be active because the company wants to look like it is growing. It may be active because the role exists in theory but no one has permission to hire.

The visible job market becomes contaminated by records that look valid but do not behave like real openings.

Exhausted job seekers have data behind the paranoia. [Greenhouse's 2024 State of Job Hunting report](https://www.greenhouse.com/blog/greenhouse-2024-state-of-job-hunting-report) said 18-22% of jobs posted on its platform in a given quarter were classified as ghost jobs, and that three in five candidates suspected they had encountered one.

That breaks trust.

Once candidates believe a meaningful percentage of postings are not real, they adapt rationally. They apply more broadly. They spend less time on each application. They use automation. They stop treating any individual posting as worthy of careful attention.

Employers then receive lower-quality applications and conclude that candidates are careless.

The system trained them to be careless.

## Hiring Managers Arrive Late

The person who best understands the role often enters the process too late.

By the time a hiring manager looks closely, the posting may already be public, recruiters may already be screening, candidates may already be eliminated, and the process may already be optimizing for the wrong signals.

This creates a familiar failure mode:

1. the posting asks for a broad profile
2. the recruiter screens for visible keywords
3. the candidate presents relevant but imperfect evidence
4. the hiring manager finally clarifies the real requirement
5. everyone discovers they were matching against the wrong shape

The role did not change.

The source of truth arrived late.

This is especially damaging for senior or unusual candidates. Their value often lives in judgment, recovery, architecture, tradeoffs, operations, mentorship, or problem framing. Those signals are hard to screen from a keyword index and easy to lose before the hiring manager sees them.

A process that claims to want senior judgment should not filter primarily on junior-legible keywords.

But many do.

## The Candidate Is Also Inconsistent

Employers do not own the whole mess.

Candidates are inconsistent too.

They maintain multiple resume versions. They compress experience differently for each role. They omit relevant work because it does not fit the page. They exaggerate the visible parts because the process rewards visibility. They apply to roles that are adjacent, aspirational, or merely tolerable because the market has become too noisy to reward precision.

That does not make candidates dishonest as a class.

It makes them participants in the same distributed system.

The resume is a replica of the person's work history. It is lossy, stale, and optimized for the reader expected to consume it. The job posting is a replica of the employer's need. It is also lossy, stale, and optimized for the market expected to consume it.

Then both sides compare the replicas and act surprised when reality fails to match.

## Eventual Consistency Is Not Enough

Eventual consistency is useful in software when the system can tolerate temporary disagreement.

Hiring often cannot.

A candidate cannot wait forever for the posting, budget, recruiter, hiring manager, ATS, interview loop, and business need to converge. They have rent, timelines, competing interviews, visa constraints, family obligations, and finite emotional bandwidth.

Employers have constraints too. They need people. They need process. They need legal caution. They need to avoid overfitting to the loudest candidate or the most polished resume.

Hiring will always have uncertainty.

The problem is that the uncertainty is hidden from the people most affected by it.

A distributed system can be eventually consistent and still terrible to use if callers cannot observe state, retry safely, or understand failure.

That is where hiring is now.

## Better Consistency

Perfect transparency would be a bad promise.

Companies will never expose every internal discussion, and they should not. Candidates will never submit a complete representation of themselves, because such a document would be unreadable and possibly illegal to ask for.

But the system could be much more honest about state.

Employers could expose basic process facts:

1. whether the role is actively funded
2. whether interviews are currently happening
3. whether an internal candidate is in process
4. whether the posting is evergreen or immediate
5. whether the salary range is approved
6. whether remote, hybrid, or location constraints are hard requirements
7. whether the candidate is rejected, queued, or still under review
8. whether rejection was caused by fit, timing, compensation, level, or process closure

None of that requires a soul-baring confession from the hiring team.

It requires treating candidates like callers of a real system.

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

That does not mean AI should make the hiring decision.

It means software should help identify where the records disagree.

If the posting says Python and the hiring manager means production Django at scale, that mismatch should be visible. If the recruiter rejects a candidate for missing Kubernetes but the role only needs container literacy, that should be visible. If the candidate's resume implies relevant incident-response experience without using the expected term, that should be visible.

Hiring software should do more than rank people.

It should make inconsistency inspectable.

## Closing Thought

The job market is not broken because every participant is careless.

It is broken because too many participants are acting rationally against stale, partial, and incompatible state.

Candidates optimize resumes for systems that barely acknowledge them. Recruiters search indexes that flatten work into terms. Hiring managers clarify requirements after screening has already happened. Companies leave stale postings online and call the resulting mess a talent market.

Eventually, the truth may emerge.

The role was paused. The range was wrong. The requirement was different. The manager wanted someone else. The posting was stale. The candidate was qualified for a job that only existed in the cache.

By then, the damage is already done.

Eventually consistent is not good enough when people are the ones waiting for convergence.
