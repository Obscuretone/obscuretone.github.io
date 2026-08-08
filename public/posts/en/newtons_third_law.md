---
title: "for (const rule of resumeAdvice) recruiter.contradict(rule);"
titleformat: code
description: For every resume rule, there exists an equal and opposite recruiter. AI should turn resume and job snapshots into a traceable professional evidence record instead of pretending it can discover the perfect format.
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

## Resume Advice Cannot Produce A Universal Law

The resume-advice industry has an unusual advantage: the person receiving the advice almost never gets to observe the alternative that matters.

Suppose a candidate removes a summary and begins receiving interviews. The missing summary becomes the explanation. Another candidate adds one and experiences the same improvement, so the new summary receives the credit. Someone shortens a resume to one page and gets hired. Someone else restores the second page and finally starts receiving calls. In each case, the most visible recent change becomes the cause of the outcome.

Nobody observes the counterfactual.

To prove that the one-page version was better for that individual application, the same candidate would need to apply to the same job with both versions and have them reviewed by the same person under identical conditions without the first review influencing the second. Both applications would need the same position in the queue, follow the same preceding candidates, encounter the same search query, and arrive before the employer learned anything new about the position or the available labour market.

That exact individual counterfactual cannot be observed in a real hiring process. Even the same recruiter is not the same evaluator on the second review. They have already seen the first resume. They may have reviewed fifty additional applications, spoken to the hiring manager, or discovered that a supposedly rare skill is common. Every preceding candidate can change the frame in which the next one is interpreted.

That does not make resume presentation scientifically untestable. Randomized audit and screening experiments can estimate whether a change affects outcomes on average. They can show that a name, spelling error, layout, or wording choice changed decisions across a studied population. They cannot establish that one format is optimal for every candidate, job, reviewer, queue, and hiring system.

Recruiter-specific research supports treating review as a variable process. In one study of 300 resumes, reviewers initially showed little agreement about candidate qualification; agreement improved after they developed shared guidelines and a common method for calculating experience. ([Clinical Research Coordinator screening study](https://pmc.ncbi.nlm.nih.gov/articles/PMC8889228/)) An experiment with 445 recruiters found that spelling errors reduced interview chances, but the penalty also varied with recruiter language sensitivity and candidate gender. ([Spelling-error screening experiment](https://pmc.ncbi.nlm.nih.gov/articles/PMC10075394/)) A resume does not carry one score that a reviewer merely discovers. It produces one result from a distribution of possible results.

Case order, fatigue, contrast, calibration, and learning are plausible contributors to that distribution, but their effects should not be exaggerated. The famous study of Israeli parole decisions reported favourable rulings falling from about 65 percent after breaks to almost zero before breaks. ([Danziger, Levav, and Avnaim-Pesso](https://doi.org/10.1073/pnas.1018033108)) Later researchers showed that case ordering was not random and that represented prisoners, who succeeded more often, tended to be heard earlier; simulations also reproduced much of the pattern without requiring a hunger-driven explanation. ([PNAS critique](https://doi.org/10.1073/pnas.1110910108)) ([Glöckner reanalysis](https://doi.org/10.1017/S1930297500004812)) The study is evidence that consequential decisions may be entangled with sequence and context, not proof that hunger reliably makes judges harsher.

Hiring evidence is mixed in the same instructive way. A study of 818 structured employment interviews found no appreciable time-of-day effect, while a study from one ophthalmology residency program found lower scores in the afternoon, especially late afternoon. ([Willihnganz and Meyers](https://doi.org/10.1177/009102609302200404)) ([Ophthalmology interview study](https://www.thieme-connect.com/products/ejournals/html/10.1055/s-0042-1744272)) The defensible claim is not that every recruiter becomes harsher at 4 p.m. It is that an unstructured review should not be assumed to be a stable, context-free measurement.

Resume advice survives because success appears to confirm it while failure can always be explained by another variable. If the candidate succeeds, the format worked. If the candidate fails, the market was difficult, the experience was weak, another rule was violated, or the recruiter happened to prefer something else. Contradictory schools can coexist indefinitely because none has to demonstrate what would have happened under the opposite recommendation.

Mass recruiting is industrialized triage. Universal resume advice is the astrology that grows around it.

The comparison is not that recruiters are mystical. It is that the advice can explain almost any result after it occurs while making very few reliable predictions beforehand. The framework gains credibility through retrospective fit, and every outcome can be absorbed into the story.

## Any Filter Is A Filter

The contradictions make more sense once the scale of mass inbound recruiting is taken seriously.

When a job receives hundreds or thousands of applications, the employer usually does not need to determine which applicant is objectively best. It needs a manageable interview slate. If ten candidates will be interviewed, the initial process must eliminate nearly everyone. It does not need to prove that each rejected person was unqualified. It only needs to leave enough plausible candidates to continue.

A filter can therefore be weakly related to performance, inconsistently applied, or plainly arbitrary while still accomplishing its operational purpose. If an excellent candidate is rejected because an internal title was unfamiliar, the organization may never know. Other acceptable candidates remain, the position is eventually filled, and the false negative disappears into the denominator. The time saved by moving on is immediate; the cost of overlooking the best person is hypothetical and usually unknowable.

This makes false negatives cheap for the employer and expensive for the applicant. The candidate experiences a lost opportunity. The company experiences nothing unless the eventual hire performs badly enough to make the missed alternative visible, which is nearly impossible because nobody can observe how the rejected candidate would have performed in the same job.

Under those conditions, any filter is a filter. Page count, a missing keyword, an employment gap, an unfamiliar title, a dense paragraph, or simply arriving after the interview slate is nearly full can become a reason to stop. The system does not need to resolve ambiguity when another candidate is one click away.

Much of what is called good resume writing is therefore advice about becoming less convenient to reject. Standard headings reduce the chance that software or a hurried reviewer misses a section. Literal terminology satisfies searches. Important claims are placed where they are likely to be seen. Familiar descriptions reduce the cost of interpreting internal company language. These tactics may be useful, but their usefulness does not prove that they measure candidate quality.

## Tailoring Must Survive Retrieval

Candidates are often told that tailoring works because it shows enthusiasm, mirrors the employer's language, and makes the application feel personal. Those effects may exist, but the foundation is much less romantic: recruiting is an information-retrieval problem. That retrieval may use Boolean queries, explicit filters, semantic search, AI-generated qualifications, or a person scanning the page.

LinkedIn Recruiter continues to document `AND`, `OR`, `NOT`, quoted phrases, and parentheses as direct search controls. It also now documents Advanced AI-Assisted Search that goes beyond filters, interprets intent, and can surface qualifications that are not explicitly listed on a candidate profile. Both systems exist. ([LinkedIn Recruiter Boolean search](https://www.linkedin.com/help/recruiter/answer/a415295)) ([LinkedIn Advanced AI-Assisted Search](https://www.linkedin.com/help/recruiter/answer/a9658019))

A recruiter searching for:

```text
"Kubernetes" AND "Python" AND "AWS"
```

will not retrieve a candidate whose resume says only:

```text
container orchestration, scripting, and cloud infrastructure
```

The candidate may possess exactly the requested experience. A semantic system might recover the relationship; a literal query will not. The candidate usually does not know which retrieval path will be used.

Good tailoring is therefore closer to retrieval compatibility than persuasion. It selects the job-relevant parts of the candidate's history and describes them using accurate terminology that literal search, semantic search, and a human reviewer can recognize. An obscure internal title can be preserved while being clarified. A technology used throughout a role can be named directly instead of hidden behind an abstract category. Relevant experience from an older position can be restored when it matters to the current search.

Nothing about the candidate changes. The representation becomes more likely to satisfy a retrieval condition.

That is still not a perfect resume. It is a resume adapted to a known filter.

## There Are Incorrect Resumes

The absence of a uniquely correct resume does not mean every resume is equally good.

A resume can contain false claims, conflicting dates, inflated titles, fabricated metrics, or responsibilities the candidate never held. It can omit material directly relevant to the job. It can also use a format that fails to survive the software expected to read it. Greenhouse documents parsing failures caused by file characteristics and formatting; when parsing fails, candidate information must be entered manually rather than appearing automatically in the record. ([Greenhouse resume parsing](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse))

A resume can also be accurate while remaining too ambiguous to support the conclusion a reviewer is expected to draw. Listing `Kubernetes` establishes that the candidate chose to type the word. It does not establish depth, duration, recency, responsibility, or outcome. Writing cannot convert an assertion into proof.

A resume is not evidence in the forensic sense. It is a collection of candidate assertions. A system can preserve where those assertions came from, detect contradictions between versions, and prevent an AI model from strengthening them without support. It cannot make them true.

There are incorrect resumes. There is no uniquely correct one.

## Replace The Seven-Second Skim

The famous six- or seven-second resume statistic came from small, company-sponsored eye-tracking studies of recruiters making an initial fit-or-no-fit decision. It is useful as evidence that triage can happen quickly, not as a universal estimate of total review time or proof that every recruiter follows the same visual path. ([TheLadders eye-tracking report](https://www.marketitwrite.com/docs/theladders-eyetracking-studyb.pdf))

Whatever the exact average, seven seconds is not a systematic review. It is a triage scan. A systematic review must define the job criteria, locate the evidence for each one, distinguish missing information from contrary evidence, record uncertainty, and preserve enough justification for another reviewer to retrace the decision.

Two minutes is barely enough for that work when it begins with an ordinary resume. With twelve criteria, two minutes allows ten seconds per criterion before the reviewer has read the document, located a source passage, resolved ambiguity, or written a justification. A two-minute review becomes plausible only when a system has already extracted and cited the relevant evidence. At that point the human is confirming a structured comparison, not performing the original review from scratch.

For all its limitations, the resume is often the most information-dense stage of hiring. It may contain ten or twenty years of roles, projects, technologies, responsibilities, dates, promotions, outcomes, and career transitions. The document is compressed, incomplete, and self-reported, but it often contains more job-relevant information than the later stages that are treated as more authoritative.

A recruiter screen may reduce that history to a few notes. An interview may focus on whichever questions happened to be asked. A scorecard may collapse several hours of discussion into a handful of ratings. By the time the hiring decision is made, much of the original information has been replaced by impressions, partial recollections, and summaries of summaries.

The resume is therefore both inadequate and unusually valuable. It is inadequate because it is a short, candidate-authored snapshot. It is valuable because it is the point at which the greatest concentration of professional history is still present in one place.

That is where AI tools should be working.

Instead of using a language model only to generate another allegedly optimized resume, use it to replace the triage scan with an AI-based parser. Extract the roles, dates, claims, projects, technologies, scope, and outcomes while preserving the exact text behind every extraction. Make the resulting data searchable and comparable, but do not pretend that parsing has verified the candidate's assertions or established their competence.

The output should not be only a mysterious fit score. It should first be a structured representation of what the resume actually says. A percentage can summarize an explicit, deterministic comparison against an approved job rubric, but it must remain secondary to the criterion states, source passages, gaps, and calculation that produced it.

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

## A Resume Schema Is Still A Resume

The obvious implementation is to convert the document into clean resume JSON. Put contact details in one object, work history in another, education in another, and skills in an array. The PDF becomes easier to search, render, and send to another system.

That is useful, but it does not cross the important boundary. It is still a resume-shaped representation.

A document schema records where a sentence belongs in a resume. It does not necessarily record which claims the sentence makes, which exact source fragments support each claim, whether the candidate supplied the wording or a model inferred it, or whether two resume versions repeat the same assertion. It has nowhere obvious to preserve competing interpretations of an ambiguous bullet. When a bullet is reordered or rewritten, a position-based identifier may change even though the professional claim did not.

The canonical record needs to sit underneath the resume format.

It should preserve source artifacts and their versions, exact fragments with stable locators, professional claims connected to roles and projects, and the status of each claim. Self-reported, model-extracted, candidate-confirmed, externally verified, disputed, and superseded are not interchangeable states. Model confidence describes confidence in an interpretation. It does not describe the probability that the candidate is telling the truth.

Identity belongs behind a separate boundary. Generated wording belongs in a presentation layer. Neither should leak into the professional claim merely because both appeared in the same exported document.

The same rule applies to the employer. A job advertisement is not a role rubric. It is another source artifact containing employer assertions, ambiguities, conventions, and inherited boilerplate. AI can propose criteria from it, but the criteria should remain cited interpretations until an authorized person decides which requirements are essential, preferred, learnable, duplicated, or simply unjustified.

Resume JSON is still valuable as an import, export, and rendering contract. It just should not be mistaken for the underlying evidence model.

## Maximum Match, Minimum Review Error

Once the candidate artifacts and employer artifacts have been converted into cited evidence and an approved role rubric, the scoring target becomes clearer.

Let $P$ be the maximum match currently supported by one frozen version of the candidate's evidence record against one approved role rubric:

$$
P = Score(EvidenceVersion, RoleRubric)
$$

This is not the candidate's inherent ability, future performance, or universal employability. It is the maximum conclusion the available, self-reported evidence supports for this particular job.

Let $R$ be the amount of that supported match recovered from one generated resume projection by a particular parser, recruiter, hiring manager, and review context. For EMH's purposes, recovered match is capped at the evidence-supported maximum:

$$
R_{reviewer,context}(ResumeProjection) \leq P
$$

The difference $P - R$ is presentation and review-channel loss. The resume-projection generator's job is to minimize that loss across plausible reviewers without inventing a claim, strengthening an assertion beyond its source, or hiding an unresolved gap.

That changes what optimization means. EMH should not produce the draft with the highest average impression from one model pretending to be one recruiter. It should prefer the grounded draft whose important evidence is recovered consistently across different parsers and reviewer strategies. In statistical terms, it should improve the lower end of the recovery distribution, not merely its mean.

A safety margin belongs in that presentation test, not in the candidate's match score. If validation shows that a review channel systematically under-recovers supported evidence by a few points, EMH can require a stronger internal presentation result before accepting the draft. It can repeat a supported skill in a searchable list and a contextual bullet, clarify an unfamiliar title without replacing it, or move the strongest cited evidence earlier. It cannot display $P + 3$, invent an extra three points of experience, or make an unsupported claim more emphatic.

The principle is simple: overprovision supported evidence, never the score or the claims. The size of any margin must be measured from multi-reviewer tests rather than chosen because three or five points feels safe.

## Structure Before Judgment

The industry is rushing to use AI at the judgment stage because judgment is the expensive and impressive part. Tools promise rankings, recommendations, fit scores, and automated decisions. But judgment built on an unstructured snapshot inherits every ambiguity already present in the document and then hides it behind a number.

The safer and more useful intervention comes earlier.

First extract the jobs, dates, assertions, skills, projects, outcomes, and source passages. Then define the requirements of the role. Then compare the two in a way that preserves what was found, what was inferred, what was missing, and what remains uncertain. Human judgment may still be required, but it is now judgment over visible material rather than an impression assembled from memory.

This does not make recruiting objective. It makes inconsistency easier to detect. A reviewer can still apply a poor criterion, but the criterion is explicit. Two reviewers can still disagree, but the disagreement is recorded. A candidate can still make a false claim, but the AI has not silently strengthened it. A resume can still omit important experience, but the system can distinguish "not found in this document" from "the candidate does not possess it."

Structured review already points in this direction. The United States Office of Personnel Management's subject-matter-expert workflow requires reviewers to evaluate resume content against predefined criteria and write a justification for each specialized-experience section; disputed evaluations can be sent to a tie-breaker who reviews both the resume and the earlier justifications. ([OPM structured resume review](https://hmsupport-usastaffing.opm.gov/hc/en-us/articles/45479458209427-Performing-a-subject-matter-expert-review))

That is a more credible use of AI than another resume optimizer. The model should not decide which recruiter superstition to obey. It should preserve the information that already exists, remove irrelevant identity cues, organize the assertions against explicit criteria, and show its work.

## The Evaluator Is A Front Door

I had been thinking about a public resume evaluator as a product: upload a resume, perhaps paste a job advertisement, and receive a useful assessment. That can still be a good interface. It is not the core product.

A general evaluator recreates the problem this essay describes. The moment it produces a context-free quality score, it quietly chooses one recruiter from every contradictory pair and calls that preference correct. Even a more careful rubric risks treating the resume as the person and the job ad as the job.

The useful public experience begins in the same place but ends somewhere different. Upload a resume and the system constructs a cited professional record. It shows the roles, projects, responsibilities, skills, scope, and outcomes it believes the document asserts. The candidate can correct the extraction, distinguish an inference from a fact, connect a claim to its context, and answer questions where the source is ambiguous.

Paste a job advertisement and the system does the same thing on the other side. It exposes the criteria it inferred, preserves the words that produced them, and distinguishes an explicit requirement from a model interpretation. Only then does it compare the two records.

The output may include a resume adapted to a known parser, search query, employer instruction, jurisdiction, or reviewer. It may diagnose conflicting dates, missing context, parse failures, and claims that are difficult to retrieve. Those are specific, inspectable results. They are not discovery of the correct resume.

This also changes what data is valuable for improving the system. A pile of resumes and job advertisements is a pile of lossy snapshots. The stronger training material is the correction trace: which extraction the candidate changed, which source fragment supports a claim, which interpretation an employer approved, which evidence resolved a criterion, and which generated sentence the candidate rejected as too strong.

The evaluator is an ingestion and correction surface. The durable product is the evidence record beneath it.

## The Correct Target

Newton's Third Law of Recruiting remains:

> For every resume rule, there exists an equal and opposite recruiter.

That law is not a reason to abandon resumes. It is a reason to stop pretending that presentation preferences constitute an objective assessment of a person.

Mass recruiting is industrialized triage. Universal resume advice is the astrology that grows around it.

AI cannot produce the horoscope that always comes true. What it can do is capture resumes, job advertisements, and later corrections as source artifacts; convert their assertions into a versioned and cited professional evidence record; exclude irrelevant personal information from the initial review; and make every later judgment and presentation easier to inspect.

There is no correct resume.

There can still be a better, more error-resistant representation of what the evidence supports, and a better record beneath every resume that follows.
