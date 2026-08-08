---
title: "throw new JobNotFoundError();"
titleformat: code
image: rt_job_not_found_terminal.webp
imagealt: "A job applicant feeds a resume into a large terminal with an empty output tray and disconnected feedback cable."
imagecaption: "The application disappears into the machine, and the feedback path never returns."
imagesource: "AI-generated illustration created for obscuretone with OpenAI image generation."
description: "Hiring rejections increasingly behave like silent software failures: candidates invest time, employers provide little signal, and the feedback gap gets worse as application volume rises."
tags: [hiring, feedback, careers, systems, software]
---

Applying for jobs can feel like interacting with software that fails silently. You submit a resume, answer screening questions, and may complete interviews, assessments, or take-home work. Then the process ends with a generic rejection, or worse, no response at all. As a candidate, you know the application did not advance but rarely know why.

In software, a bad error message is more than annoying because it blocks debugging: the user learns that something went wrong while the information needed to correct it stays hidden. Modern hiring often works the same way.

## The Feedback Gap Is Getting Worse

Recruiting-industry surveys cannot estimate every candidate population, but they describe a widespread feedback problem.

[iHire surveyed 1,024 candidates in October 2025](https://www.ihire.com/resourcecenter/employer/pages/53-percent-of-job-seekers-have-been-ghosted-by-a-potential-employer) and found that 53% had been ghosted by an employer during their job search.

[Greenhouse reported](https://www.greenhouse.com/blog/greenhouse-2024-state-of-job-hunting-report) that 61% of job seekers had been ghosted after an interview, up nine percentage points from earlier in 2024.

That second number matters because post-interview ghosting is not silence after a low-effort application. It happens after the candidate has already spent real time in the employer's process.

At the same time, the macro hiring market has become more confusing. The [Bureau of Labor Statistics reported](https://www.bls.gov/news.release/jolts.nr0.htm) 7.6 million U.S. job openings and 5.2 million hires in May 2026. Those figures cannot be treated as a conversion funnel: openings count positions open on the last business day, while hires count additions to payroll throughout the month.

The distinction is part of why job seekers can feel disconnected from the market's official story. A large aggregate stock of openings says nothing about whether a particular listing is current, funded, responsive, or likely to close. The jobs are listed. The applications are submitted. The process can still go nowhere.

## The Error Message Problem

Most hiring rejections are equivalent to:

> Something went wrong.

That leaves candidates without enough information to debug.

A candidate needs to know which kind of failure happened:

1. the resume was never read
2. the resume was screened out by keyword or tooling
3. the role already had an internal candidate
4. the role was paused or cancelled
5. the salary range did not match
6. the experience level was too junior or too senior
7. the interview signal was weak in a specific area
8. another candidate was stronger on a concrete requirement

Those problems require different responses.

If a candidate lacks Kubernetes operations experience, they can learn from that. If the company paused the role, rewriting the resume is wasted effort. If the issue was compensation, the candidate should not reinterpret the rejection as a skill failure. If the resume never made it past a search filter, the problem may be presentation rather than ability.

Generic rejection messages collapse all of those possibilities into nothing.

## Why Companies Do It

There are understandable reasons companies avoid feedback.

Feedback takes time, can create legal risk, and may invite argument. Recruiters may lack useful notes from the hiring team, hiring managers may avoid writing anything specific, and applicant volume can be overwhelming. Those explanations reveal the actual system design without making the candidate experience any better: the employer has internal logs, but the candidate only gets a sanitized error page.

That design might be convenient for the company, but it pushes all uncertainty onto the applicant.

## The Cost To Candidates

When candidates receive no signal, they have to guess. They may rewrite the wrong parts of their resume, overcorrect in interviews, apply to roles for which they were never realistically being considered, or assume a skills gap where the real issue was timing, budget, an internal candidate, or a frozen requisition.

The silence also makes the process emotionally corrosive.

It is hard to maintain a healthy sense of reality when the labor market keeps returning null responses. After enough silent failures, even strong candidates start treating every application as evidence against themselves.

That is what happens when the system withholds diagnostic information while demanding repeated effort.

## Better Feedback Does Not Need To Be Dangerous

Most candidates are not asking for a debate, a performance review, or a legally risky confession. They are asking for a useful category of information.

Employers could provide structured feedback without overexposing themselves:

1. **Experience depth:** "We needed more production experience with distributed systems."
2. **Role scope:** "The role requires direct people-management ownership."
3. **Domain fit:** "We prioritized candidates with healthcare data experience."
4. **Interview signal:** "The system design interview needed stronger tradeoff analysis."
5. **Process status:** "The role was paused before final selection."
6. **Candidate pool:** "Another candidate had more direct experience with this specific stack."

That stops well short of perfect transparency, but it gives a candidate enough signal to decide what to change.

The highest obligation should come after interviews. If a candidate has invested live time with the company, the company should close the loop with something more useful than silence.

## Better Systems Would Help Employers Too

Kindness is only part of the argument because hiring feedback is also part of the employer's product surface. A company that ghosts candidates teaches the market something about how it operates, while one that communicates clearly earns goodwill even from people it rejects.

Better feedback also improves future matching. Candidates who understand why they were declined can return later with better alignment. Recruiters get fewer confused follow-ups. Hiring teams build a more defensible process when the evaluation criteria are explicit enough to share in simplified form.

The same tools companies use internally could support this:

1. structured interview rubrics
2. rejection reason categories
3. automated status updates
4. candidate-facing process states
5. plain-language feedback templates
6. expiry notices for paused or stale postings

The bar only has to be higher than disappearing.

## Closing Thought

Hiring will never be perfectly transparent, and companies do need consistency, discretion, and legal caution. A process can still be careful without being opaque.

Right now, too much hiring behaves like broken software: no stack trace, no useful error message, no indication whether the request was ever processed.

Candidates do not need every internal detail, only enough signal to know what happened and what to do next.

When someone invests time in a hiring process, "job not found" is not good enough.
