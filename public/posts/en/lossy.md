---
title: Resumes And Job Descriptions Are Lossy Compression
description: Hiring starts by compressing people and work into tiny artifacts, then pretends the artifacts contain enough signal to make confident decisions.
---

Hiring starts with two compression artifacts.

A resume compresses a person's working life into a few pages.

A job description compresses an organization's need into a public advertisement.

Then everyone pretends those two artifacts can be compared cleanly.

They cannot.

Both are lossy.

The interesting information is often exactly what gets discarded.

## The Resume Is Not The Person

A resume is a brutal file format.

It has to reduce years of work into titles, dates, employers, tools, bullets, and metrics. It has to fit on one or two pages. It has to be readable by a human under time pressure and by software that may treat layout, keywords, and section headings as evidence.

That means the resume is not a record of the work.

It is a compressed representation of the work.

Compression is not automatically bad. A good resume should summarize. Nobody wants a complete event log of every meeting, outage, migration, argument, incident, refactor, design review, and production surprise.

But compression always chooses what to keep.

A resume tends to preserve:

1. job title
2. company name
3. dates
4. technologies
5. recognizable project names
6. numerical outcomes
7. promotions and scope signals

It tends to discard:

1. judgment
2. taste
3. context
4. uncertainty
5. tradeoffs
6. failure recovery
7. political constraints
8. what the person prevented
9. how much help they had
10. whether the hard part was technical or organizational

That is a problem because the discarded information is often the part that distinguishes strong work from lucky work, shallow work, or merely well-advertised work.

## The Job Description Is Not The Job

The job description is just as compressed.

It takes a messy organizational reality and turns it into a public-facing role.

The real job may involve a legacy system nobody wants to mention, a manager trying to backfill someone irreplaceable, a team recovering from a failed migration, a product that has outgrown its architecture, or a political problem disguised as a technical one.

The posting usually says:

1. build scalable systems
2. collaborate cross-functionally
3. own features end to end
4. work with Python, React, Kubernetes, AWS, PostgreSQL, or whatever terms survived the editing process
5. thrive in a fast-paced environment

That is not a job.

That is a brochure for a job.

Like a resume, the job description preserves the easiest signals to publish. It keeps tools, responsibilities, seniority, location, salary if legally required, and a general sense of the company's self-image.

It discards the things candidates most need to know:

1. why the role exists
2. what failed before
3. what success actually changes
4. which constraints are real
5. which requirements are negotiable
6. whether the team has time to onboard
7. whether the manager knows what they want
8. whether the budget is approved
9. whether the system is stable, burning, or quietly haunted by past decisions

Candidates apply to the brochure.

Then, if they are lucky, they interview for the job.

## Comparing Two Lossy Files

Most hiring systems compare the resume to the job description as if the important information survived compression on both sides.

That is optimistic.

The resume might omit a skill because the candidate assumed it was obvious, used it years ago, learned it under a different name, or did not have room to explain the relevant project.

The job description might include a skill because someone copied it from a previous posting, because the team might use it later, because it sounds senior, or because the hiring manager forgot to distinguish required from nice-to-have.

Then the system compares the two artifacts and declares a match or mismatch.

That is how absurd outcomes happen.

A candidate can be rejected for not mentioning a technology they used daily.

A candidate can pass screening because they repeated a keyword they barely understand.

A team can receive hundreds of applications that match the posting and almost none that match the actual work.

The problem is not only bad faith.

The problem is that both sides are comparing compressed files without enough error correction.

## Keywords Are Compression Residue

Keywords matter because they are easy to preserve through compression.

If a resume says `Kubernetes` and the job description says `Kubernetes`, the system can see the overlap.

That does not mean the candidate can operate Kubernetes in production. It does not mean the role really requires Kubernetes expertise. It does not mean the word was used at the same level of depth on both sides.

It only means the token survived.

This is why keyword matching feels simultaneously useful and stupid.

It catches obvious overlap.

It misses implied experience.

It rewards people who know which words to include.

It punishes people whose work is real but described differently.

The keyword is not the skill.

It is the residue left after the skill has been compressed into text.

## Metrics Are Also Lossy

Numbers look like high-quality signal.

Sometimes they are.

Reduced latency by 40%. Cut cloud spend by $200,000. Increased conversion by 8%. Migrated 12 services. Supported 5 million users.

Those are useful claims. They give scale and shape to the work.

They are also compressed.

A number rarely explains:

1. baseline conditions
2. measurement method
3. team contribution
4. organizational support
5. whether the metric was durable
6. whether the tradeoff was acceptable
7. whether the number was chosen because it was true or because it looked good

The hiring market has taught candidates to produce numbers because numbers survive the skim.

That does not make numbers fake.

It makes them dangerous when treated as complete.

A resume bullet with a large number can be evidence. It can also be a compression artifact optimized for attention.

The reader still has to decompress it.

## What Gets Lost Is Often The Work

The hardest engineering work often leaves weak resume artifacts.

Preventing an outage is less visible than causing one and fixing it.

Simplifying a system may sound smaller than building a new one.

Mentoring someone until they succeed produces credit in someone else's bullet.

Killing a bad project before it wastes a year may leave no public artifact at all.

Negotiating a sane migration path may look less impressive than declaring a rewrite.

Making a system boring is one of the highest forms of engineering taste, and one of the hardest things to advertise.

That is not a resume-writing problem alone.

It is a compression problem.

The market wants evidence that fits inside bullets. The work often lives between them.

## The Employer Also Lies By Compression

Candidates are often told not to exaggerate.

Fair enough.

Employers should hear the same advice.

A job description exaggerates when it describes maintenance as greenfield development, chaos as autonomy, understaffing as ownership, emergency response as fast pace, or unclear priorities as ambiguity.

It exaggerates when every requirement is listed as mandatory because nobody wants to make the hard distinction.

It exaggerates when the salary band technically exists but the company only intends to hire at the bottom.

It exaggerates when the posting asks for collaboration but the team actually needs someone to absorb neglect.

This is the employer-side version of keyword stuffing.

The organization compresses its need into a more attractive artifact, then complains when candidates do the same.

## Decompression Is The Real Hiring Work

A good hiring process is not just matching.

It is decompression.

The point of screening, interviews, references, work samples, and structured questions should be to recover the information lost in the artifacts.

For the candidate, that means asking:

1. What did this person actually do?
2. What was hard about it?
3. What constraints did they face?
4. What decisions did they make?
5. What did they learn when things went wrong?
6. What evidence is missing, and is it missing because it is absent or because the resume failed to preserve it?

For the employer, it means asking:

1. What does this team actually need?
2. Which requirements are real?
3. Which skills can be learned on the job?
4. What problem will this person inherit?
5. What would success look like after six months?
6. What are we hiding from candidates because it makes the role harder to sell?

That last question is the uncomfortable one.

It is also one of the most useful.

## Better Artifacts

The answer is not to make resumes longer or job descriptions exhaustive.

Nobody wants that.

The answer is to design better artifacts and better decompression paths.

Resumes should be allowed to preserve evidence, not just polish. Project context, tradeoffs, failure recovery, operating environment, and collaboration shape matter.

Job descriptions should distinguish:

1. required skills from preferred skills
2. current stack from future stack
3. actual work from employer branding
4. hard constraints from guesses
5. immediate problems from long-term aspirations

Hiring systems should treat missing information carefully. Missing is not zero. A resume that does not mention a skill may require follow-up, not rejection. A job description that lists ten tools may require clarification, not blind filtering.

This is where software could help, if it were built around evidence instead of shortcuts.

A useful system would not simply score the resume against the posting. It would ask what information survived compression, what was lost, where the artifacts disagree, and what questions would recover the missing signal.

## Closing Thought

Resumes and job descriptions are not truth.

They are compressed files.

Sometimes they are useful. Sometimes they are misleading. Sometimes they are technically valid and semantically useless.

The mistake is treating them as if they contain enough information to make confident decisions without decompression.

That is how hiring becomes keyword matching, title shopping, brand-name filtering, and vibes with paperwork.

People are more complicated than resumes.

Jobs are more complicated than postings.

The work of hiring is figuring out what the compression threw away.
