---
title: Hiring Is Lossy Compression
image: rt_lossy_compression.webp
imagealt: "Retrofuturist plate of resumes and job descriptions passing through a compression codec."
imagecaption: "Resumes and job descriptions as lossy compression artifacts."
imagesource: "AI-generated illustration created for obscuretone with OpenAI image generation."
description: Hiring starts by compressing people and work into tiny artifacts, then pretends the artifacts contain enough signal to make confident decisions.
tags: [hiring, resumes, compression, evidence, systems]
---

Hiring starts with two compression artifacts: a resume reduces a person's working life to a few pages, while a job description reduces an organization's need to a public advertisement. Everyone then pretends the artifacts can be compared cleanly, even though both are lossy and often discard exactly the information that matters.

## The Resume Is Not The Person

A resume is a brutal file format.

It has to reduce years of work into titles, dates, employers, tools, bullets, and metrics. It has to fit on one or two pages. It has to be readable by a human under time pressure and by software that may treat layout, keywords, and section headings as evidence. Harvard Business School's *Hidden Workers* report is a useful institutional version of the same problem: efficient screening systems can [filter out people whose resumes do not match narrow criteria](https://www.hbs.edu/ris/Publication%20Files/hiddenworkers09032021_Fuller_white_paper_33a2047f-41dd-47b1-9a8d-bd08cf3bfa94.pdf "hiring, resumes, evidence | Harvard"), even when they may be able to do the work.

The resume is a compressed representation rather than a record of the work.

Compression is not automatically bad. A good resume should summarize. Nobody wants a complete event log of every meeting, outage, migration, argument, incident, refactor, design review, and production surprise.

Compression always chooses what to keep.

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

The job description is equally compressed because it turns a messy organizational reality into a public-facing role.

The real job may involve a legacy system nobody wants to mention, a manager trying to backfill someone irreplaceable, a team recovering from a failed migration, a product that has outgrown its architecture, or a political problem disguised as a technical one. Even at the aggregate level, the job ad is only a partial signal: the U.S. Bureau of Labor Statistics treats job openings and hires as distinct measures in [JOLTS](https://www.bls.gov/jlt/ "hiring, evidence, systems | BLS"), which is a polite statistical way of saying a posted opening is not the same thing as a completed job match.

The posting usually says:

1. build scalable systems
2. collaborate cross-functionally
3. own features end to end
4. work with Python, React, Kubernetes, AWS, PostgreSQL, or whatever terms survived the editing process
5. thrive in a fast-paced environment

The result is a placeholder and a brochure for a job, not the job itself.

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

Candidates apply to the brochure and, if they are lucky, eventually interview for the job.

## Comparing Two Lossy Files

Most hiring systems optimistically compare the resume to the job description as if the important information survived compression on both sides.

The resume might omit a skill because the candidate assumed it was obvious, used it years ago, learned it under a different name, or did not have room to explain the relevant project.

The job description might include a skill because someone copied it from a previous posting, because the team might use it later, because it sounds senior, or because the hiring manager forgot to distinguish required from nice-to-have.

The system compares those artifacts and declares a match or mismatch, producing absurd outcomes: candidates are rejected for omitting technologies they used daily, others pass by repeating keywords they barely understand, and teams receive hundreds of applications that match the posting but almost none that match the work.

Bad faith is only one part of the problem; both sides are comparing compressed files without enough error correction.

## Keywords Are Compression Residue

Keywords matter because they are easy to preserve through compression.

If a resume says `Kubernetes` and the job description says `Kubernetes`, the system can see the overlap.

A surviving token proves only that both artifacts contain the word. It says nothing by itself about whether the candidate can operate Kubernetes in production, whether the role requires that depth, or whether both sides used the term in the same way.

This is why keyword matching feels simultaneously useful and inadequate. It catches obvious overlap while missing implied experience, rewarding people who know which words to include and punishing people whose real work is described differently.

The keyword is residue left after the skill has been compressed into text.

## Metrics Are Also Lossy

Numbers often look like high-quality signal, and sometimes they are.

Reduced latency by 40%. Cut cloud spend by $200,000. Increased conversion by 8%. Migrated 12 services. Supported 5 million users.

Those claims give scale and shape to the work, but they are compressed too.

A number rarely explains:

1. baseline conditions
2. measurement method
3. team contribution
4. organizational support
5. whether the metric was durable
6. whether the tradeoff was acceptable
7. whether the number was chosen because it was true or because it looked good

The hiring market has taught candidates to produce numbers because numbers survive the skim. That does not make them fake, but it does make them dangerous when treated as complete.

A resume bullet with a large number can be evidence. It can also be a compression artifact optimized for attention.

The reader still has to decompress it.

## What Gets Lost Is Often The Work

The hardest engineering work often leaves weak resume artifacts:

1. preventing an outage is less visible than causing one and fixing it
2. simplifying a system may sound smaller than building a new one
3. mentoring someone until they succeed produces credit in someone else's bullet
4. killing a bad project before it wastes a year may leave no public artifact
5. negotiating a sane migration path may look less impressive than declaring a rewrite

Making a system boring is one of the highest forms of engineering taste and one of the hardest things to advertise.

Resume writing alone cannot solve a compression problem.

The market wants evidence that fits inside bullets. The work often lives between them.

## The Employer Also Lies By Compression

Candidates are often told not to exaggerate, which is fair enough, but employers should hear the same advice.

A job description exaggerates when it describes maintenance as greenfield development, chaos as autonomy, understaffing as ownership, emergency response as fast pace, or unclear priorities as ambiguity.

It exaggerates when every requirement is listed as mandatory because nobody wants to make the hard distinction.

It exaggerates when the salary band technically exists but the company only intends to hire at the bottom.

It exaggerates when the posting asks for collaboration but the team actually needs someone to absorb neglect.

This is the employer-side version of keyword stuffing.

The organization compresses its need into a more attractive artifact, then complains when candidates do the same.

## Decompression Is The Real Hiring Work

A good hiring process needs more than matching because its real work is decompression.

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

That last question is both uncomfortable and unusually useful.

## Better Artifacts

Longer resumes and exhaustive job descriptions will not fix the problem, nor would anyone want them. The answer is to design better artifacts and better decompression paths.

Resumes should be allowed to preserve evidence instead of only polish. Project context, tradeoffs, failure recovery, operating environment, and collaboration shape matter.

Job descriptions should distinguish:

1. required skills from preferred skills
2. current stack from future stack
3. actual work from employer branding
4. hard constraints from guesses
5. immediate problems from long-term aspirations

Hiring systems should treat missing information carefully. Missing is not zero. A resume that does not mention a skill may require follow-up, not rejection. A job description that lists ten tools may require clarification, not blind filtering.

This is where software could help, if it were built around evidence instead of shortcuts.

A useful system would ask what information survived compression, what was lost, where the artifacts disagree, and what questions would recover the missing signal.

## Closing Thought

Resumes and job descriptions are compressed files rather than complete truth.

Sometimes they are useful. Sometimes they are misleading. Sometimes they are technically valid and semantically useless.

The mistake is treating them as if they contain enough information to make confident decisions without decompression.

That is how hiring becomes keyword matching, title shopping, brand-name filtering, and vibes with paperwork.

People are more complicated than resumes, and jobs are more complicated than postings. The work of hiring is figuring out what the compression threw away.
