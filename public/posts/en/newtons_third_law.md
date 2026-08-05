---
title: Newton's Third Law of Recruiting
description: For every resume rule, there exists an equal and opposite recruiter. Mass recruiting is industrialized triage, and AI should turn the resume snapshot into structured, anonymized data instead of pretending it can discover the perfect format.
tags: [hiring, resumes, recruiting, artificial intelligence, software, systems]
---

Resume advice has had decades to converge, and it has not.

Candidates are told to keep a resume to one page unless two pages are necessary, to begin with a summary unless recruiters skip summaries, and to include a skills section because recruiters search for keywords unless unsupported lists prove nothing. Official job titles must be preserved because accuracy matters, while unfamiliar titles must also be translated because nobody outside the company knows what they mean. Every rule arrives with successful candidates who followed it, experienced recruiters who insist upon it, and other experienced recruiters who consider it completely wrong.

I have been trying to solve the problem of what a perfect resume is because the question drives my Spidey sense insane. The industry speaks as though a correct answer must exist, yet every attempt to pin it down dissolves into exceptions, preferences, anecdotes, and advice that can be reversed without becoming any less authoritative. Hiring has existed long enough, and resumes have been reviewed at sufficient scale, that genuinely universal advice should have become obvious by now. If one-page resumes reliably outperformed two-page resumes across employers, roles, reviewers, and levels of experience, the debate would eventually have collapsed.

Instead, the contradictions have multiplied.

The obvious explanation is not that nobody has discovered the correct resume yet. It is that there is no correct resume to discover.

## Newton's Third Law of Recruiting

For every resume rule, there exists an equal and opposite recruiter.

That is Newton's Third Law of Recruiting. It sounds like a joke because it is phrased like one, but it describes the industry unusually well. One recruiter says a concise document respects their time; another says experienced candidates destroy the evidence needed to assess them when they force a career onto one page. One uses the summary to understand what the candidate is trying to do; another skips it because summaries are usually unsupported marketing language. One needs a prominent skills section to retrieve candidates through keyword search; another ignores it because typing `Kubernetes` does not establish whether the candidate completed a tutorial or operated production clusters for three years.

Both recruiters may be accurately describing their own behaviour. There is no contradiction to resolve if the two rules apply to different evaluators.

Most resume advice quietly assumes that a document is processed by a stable function. Improve the wording, rearrange the sections, remove an extra page, and the resume itself supposedly becomes better. In practice, it passes through search queries, parsers, recruiters, hiring managers, interviewers, changing interpretations of the role, and an applicant pool that alters the context in which every candidate is judged. Each stage sees different information and applies different filters.

A resume can be easier for a particular parser, more visible to a particular search, clearer to a particular reviewer, or better aligned with a particular job. It cannot be universally optimal because there is no universal evaluation process against which to optimize it.

## Resume Advice Cannot Become A Science

The resume-advice industry has an unusual advantage: almost none of its claims can be tested against the alternative that matters.

Suppose a candidate removes a summary and begins receiving interviews. The missing summary becomes the explanation. Another candidate adds one and experiences the same improvement, so the new summary receives the credit. Someone shortens a resume to one page and gets hired. Someone else restores the second page and finally starts receiving calls. In each case, the most visible recent change becomes the cause of the outcome.

Nobody observes the counterfactual.

To prove that the one-page version was better, the same candidate would need to apply to the same job with both versions and have them reviewed by the same person under identical conditions without the first review influencing the second. Both applications would need the same position in the queue, follow the same preceding candidates, encounter the same search query, and arrive before the employer learned anything new about the position or the available labour market.

That experiment cannot exist in a real hiring process. Even the same recruiter is not the same evaluator on the second review. They have already seen the first resume. They may have reviewed fifty additional applications, spoken to the hiring manager, or discovered that a supposedly rare skill is common. Every preceding candidate changes the frame in which the next one is interpreted.

Case order matters because every candidate is a case. Whether the mechanism is fatigue, contrast, calibration, learning, or consistency with earlier decisions, sequential reviews are not independent of the sequence. A resume does not carry one score that the reviewer merely discovers. It produces one result from a distribution of possible results.

Resume advice survives because success appears to confirm it while failure can always be explained by another variable. If the candidate succeeds, the format worked. If the candidate fails, the market was difficult, the experience was weak, another rule was violated, or the recruiter happened to prefer something else. Contradictory schools can coexist indefinitely because none has to demonstrate what would have happened under the opposite recommendation.

Mass recruiting is industrialized triage. Resume advice is the astrology that grows around it.

The comparison is not that recruiters are mystical. It is that the advice can explain almost any result after it occurs while making very few reliable predictions beforehand. The framework gains credibility through retrospective fit, and every outcome can be absorbed into the story.

## Any Filter Is A Filter

The contradictions make more sense once the scale of mass inbound recruiting is taken seriously.

When a job receives hundreds or thousands of applications, the employer usually does not need to determine which applicant is objectively best. It needs a manageable interview slate. If ten candidates will be interviewed, the initial process must eliminate nearly everyone. It does not need to prove that each rejected person was unqualified. It only needs to leave enough plausible candidates to continue.

A filter can therefore be weakly related to performance, inconsistently applied, or plainly arbitrary while still accomplishing its operational purpose. If an excellent candidate is rejected because an internal title was unfamiliar, the organization may never know. Other acceptable candidates remain, the position is eventually filled, and the false negative disappears into the denominator. The time saved by moving on is immediate; the cost of overlooking the best person is hypothetical and usually unknowable.

This makes false negatives cheap for the employer and expensive for the applicant. The candidate experiences a lost opportunity. The company experiences nothing unless the eventual hire performs badly enough to make the missed alternative visible, which is nearly impossible because nobody can observe how the rejected candidate would have performed in the same job.

Under those conditions, any filter is a filter. Page count, a missing keyword, an employment gap, an unfamiliar title, a dense paragraph, or simply arriving after the interview slate is nearly full can become a reason to stop. The system does not need to resolve ambiguity when another candidate is one click away.

Much of what is called good resume writing is therefore advice about becoming less convenient to reject. Standard headings reduce the chance that software or a hurried reviewer misses a section. Literal terminology satisfies searches. Important claims are placed where they are likely to be seen. Familiar descriptions reduce the cost of interpreting internal company language. These tactics may be useful, but their usefulness does not prove that they measure candidate quality.

## Tailoring Is Mostly Boolean Search

Candidates are often told that tailoring works because it shows enthusiasm, mirrors the employer's language, and makes the application feel personal. Those effects may exist, but the foundation is much less romantic: recruiting is an information-retrieval problem, and much of that retrieval is still Boolean search.

LinkedIn Recruiter continues to document `AND`, `OR`, `NOT`, quoted phrases, and parentheses as direct search controls. Recruiters can narrow candidates by title, company, keyword, skill, industry, school, and language because the system is designed to reduce a large pool through explicit conditions. AI-assisted interfaces may sit beside those controls, but they have not removed the Boolean machinery. ([LinkedIn Recruiter Boolean search](https://www.linkedin.com/help/recruiter/answer/a415295))

A recruiter searching for:

```text
"Kubernetes" AND "Python" AND "AWS"
```

does not retrieve a candidate whose resume says only:

```text
container orchestration, scripting, and cloud infrastructure
```

The candidate may possess exactly the requested experience. The search does not care. An assertion that cannot be retrieved cannot be evaluated.

Good tailoring is therefore closer to query compatibility than persuasion. It selects the job-relevant parts of the candidate's history and describes them using accurate terminology the employer's search can recognize. An obscure internal title can be preserved while being clarified. A technology used throughout a role can be named directly instead of hidden behind an abstract category. Relevant experience from an older position can be restored when it matters to the current search.

Nothing about the candidate changes. The representation becomes more likely to satisfy a retrieval condition.

That is still not a perfect resume. It is a resume adapted to a known filter.

## There Are Incorrect Resumes

The absence of a uniquely correct resume does not mean every resume is equally good.

A resume can contain false claims, conflicting dates, inflated titles, fabricated metrics, or responsibilities the candidate never held. It can omit material directly relevant to the job. It can also use a format that fails to survive the software expected to read it. Greenhouse documents parsing failures caused by file characteristics and formatting; when parsing fails, candidate information must be entered manually rather than appearing automatically in the record. ([Greenhouse resume parsing](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse))

A resume can also be accurate while remaining too ambiguous to support the conclusion a reviewer is expected to draw. Listing `Kubernetes` establishes that the candidate chose to type the word. It does not establish depth, duration, recency, responsibility, or outcome. Writing cannot convert an assertion into proof.

A resume is not evidence in the forensic sense. It is a collection of candidate assertions. A system can preserve where those assertions came from, detect contradictions between versions, and prevent an AI model from strengthening them without support. It cannot make them true.

There are incorrect resumes. There is no uniquely correct one.

## Replace The Seven-Second Skim

For all its limitations, the resume is often the most information-dense stage of hiring. It may contain ten or twenty years of roles, projects, technologies, responsibilities, dates, promotions, outcomes, and career transitions. The document is compressed, incomplete, and self-reported, but it often contains more job-relevant information than the later stages that are treated as more authoritative.

A recruiter screen may reduce that history to a few notes. An interview may focus on whichever questions happened to be asked. A scorecard may collapse several hours of discussion into a handful of ratings. By the time the hiring decision is made, much of the original information has been replaced by impressions, partial recollections, and summaries of summaries.

The resume is therefore both inadequate and unusually valuable. It is inadequate because it is a short, candidate-authored snapshot. It is valuable because it is the point at which the greatest concentration of professional history is still present in one place.

That is where AI tools should be working.

Instead of using a language model to generate another allegedly optimized resume, use it to replace the seven-second skim with an AI-based parser. Extract the roles, dates, claims, projects, technologies, scope, and outcomes while preserving the exact text behind every extraction. Make the resulting data searchable and comparable, but do not pretend that parsing has verified the candidate's assertions or established their competence.

The output should not be a mysterious fit score. It should be a structured representation of what the resume actually says.

A reviewer searching for production Kubernetes experience should be able to see every relevant assertion, the roles in which it appeared, the dates attached to it, and the source text supporting the extraction. If cluster administration is not explicit, the system should say so. If the candidate merely lists Kubernetes in a skills section, that should remain distinguishable from three years of operating production workloads.

AI does not need to replace the recruiter. It needs to replace the part where years of professional history are reduced to whatever one person notices in seven seconds.

## Review The Work Before The Person

Turning the resume into structured data creates another possibility that ordinary resume review cannot reliably provide: the first evaluation does not need to include the candidate's identity at all.

The ingestion stage can separate personal information from professional assertions before review begins. Names, photographs, contact details, addresses, pronouns, and other unnecessary identifying fields can be quarantined while the reviewer receives only the roles, dates, projects, claimed skills, responsibilities, outcomes, and source passages relevant to the job criteria.

This should be enforced architecturally rather than requested politely. The evaluation model should not be instructed to ignore the candidate's name. It should never receive the name.

Identity cues demonstrably affect hiring decisions. A well-known field experiment found substantially different callback rates for otherwise equivalent resumes carrying names perceived as White or African American, while research on blind orchestral auditions found that concealing identity changed women's chances of advancing and being hired. ([Bertrand and Mullainathan](https://www.nber.org/papers/w9873)) ([Goldin and Rouse](https://www.nber.org/papers/w5903))

Removing those cues can reduce direct identity bias during the initial review, but it cannot eliminate bias entirely. Schools, employers, geography, languages, dates, career gaps, and professional organizations may still act as proxies. A biased job requirement remains biased even when applied anonymously, and discrimination can reappear as soon as the candidate becomes visible during interviews.

The objective is therefore not to declare the system unbiased. It is to remove information that has no legitimate role in the initial decision, hold the job criteria constant, and make every conclusion traceable to professional assertions rather than personal identity.

AI does not inherently reduce bias. A pipeline designed to withhold irrelevant information can.

## From Snapshot To Structured Data

A resume contains entities and relationships that are difficult to compare while trapped in prose. A role has dates, an employer, a title, technologies, responsibilities, projects, scope, and outcomes. A claimed skill may appear in several jobs at different levels of depth. A promotion changes the meaning of later responsibilities. An achievement may depend on a team, system, or business context described elsewhere in the document.

AI is well suited to extracting those relationships, provided the original text remains attached to every result.

The output should not simply say:

```text
Kubernetes: 8/10
```

It should say something closer to:

```text
Claim: Operated Kubernetes in production
Source: Senior Platform Engineer, 2021-2024
Supporting text:
- Maintained production Kubernetes workloads
- Led migration of 40 services
- Owned deployment reliability

Unresolved:
- Cluster administration responsibility is not explicit
- Incident-response depth is not stated
```

That is structured data without pretending the model has verified the claim. The candidate still supplied the assertion. The AI has made it retrievable, comparable, and open to review.

The same process can detect conflicting dates, distinguish a skill list from contextual use, connect claims to the jobs where they occurred, and preserve uncertainty rather than converting missing information into a negative score. A reviewer can then examine a finite set of job criteria against a finite set of cited assertions instead of repeatedly rereading an entire document and relying on memory.

The important architectural property is provenance. Every extracted fact, inference, and unresolved question must point back to the text that produced it. If a model interprets "supported the migration" as leadership, the reviewer should be able to see immediately that the source does not justify the stronger claim. If two reviewers disagree about whether a bullet demonstrates production ownership, the disagreement can attach to the same criterion and the same source text.

AI does not make the resume true. It makes the review traceable.

## Structure Before Judgment

The industry is rushing to use AI at the judgment stage because judgment is the expensive and impressive part. Tools promise rankings, recommendations, fit scores, and automated decisions. But judgment built on an unstructured snapshot inherits every ambiguity already present in the document and then hides it behind a number.

The safer and more useful intervention comes earlier.

First extract the jobs, dates, assertions, skills, projects, outcomes, and source passages. Then define the requirements of the role. Then compare the two in a way that preserves what was found, what was inferred, what was missing, and what remains uncertain. Human judgment may still be required, but it is now judgment over visible material rather than an impression assembled from memory.

This does not make recruiting objective. It makes inconsistency easier to detect. A reviewer can still apply a poor criterion, but the criterion is explicit. Two reviewers can still disagree, but the disagreement is recorded. A candidate can still make a false claim, but the AI has not silently strengthened it. A resume can still omit important experience, but the system can distinguish "not found in this document" from "the candidate does not possess it."

Structured review already points in this direction. The United States Office of Personnel Management's subject-matter-expert workflow requires reviewers to evaluate resume content against predefined criteria and write a justification for each specialized-experience section; disputed evaluations can be sent to a tie-breaker who reviews both the resume and the earlier justifications. ([OPM structured resume review](https://hmsupport-usastaffing.opm.gov/hc/en-us/articles/45479458209427-Performing-a-subject-matter-expert-review))

That is a more credible use of AI than another resume optimizer. The model should not decide which recruiter superstition to obey. It should preserve the information that already exists, remove irrelevant identity cues, organize the assertions against explicit criteria, and show its work.

## The Correct Target

Newton's Third Law of Recruiting remains:

> For every resume rule, there exists an equal and opposite recruiter.

That law is not a reason to abandon resumes. It is a reason to stop pretending that presentation preferences constitute an objective assessment of a person.

Mass recruiting is industrialized triage. Resume advice is the astrology that grows around it.

AI cannot produce the horoscope that always comes true. What it can do is capture the resume at the moment it still contains the largest concentration of professional information, convert that snapshot into structured and cited data, exclude irrelevant personal information from the initial review, and make every later judgment easier to inspect.

There is no correct resume.

There can still be a better representation of what the resume contains.
