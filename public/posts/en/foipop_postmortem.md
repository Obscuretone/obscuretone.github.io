---
title: FOIPOP - The Hack That Wasn't
description: A post-mortem on Nova Scotia's FOIPOP breach, the teenager blamed for it, and the public pressure campaign that turned a quiet government security failure into an accountability problem.
---

In 2018, Nova Scotia published sensitive Freedom of Information documents on the public internet.

Then the province called it a hack.

That word was the escape hatch.

It moved the story away from the obvious system failure: a government web portal exposed documents without meaningful access control. It moved attention toward a 19-year-old who changed numbers in a URL, downloaded files, and got arrested.

That was the underlying problem. Once the province described its own exposed records as a hack, responsibility moved from the people who built, approved, operated, and defended the system to the teenager who touched the evidence. "Hack" was not a technical description. It was a liability transfer.

The technical issue was not subtle. Sequential identifiers are not authorization. HTTPS is not access control. A document being reachable from a public URL is not the same thing as a protected record. If the only thing between a citizen and someone else's FOIPOP package is changing `id=1234` to `id=1235`, the problem is not an elite cyberattack.

The problem was architecture.

And the people responsible for that architecture were not random bystanders.

## What Happened

Nova Scotia's FOIPOP portal allowed documents to be retrieved by changing sequential numbers in URLs. Thousands of documents were accessed. Some contained sensitive personal information.

The province's public framing treated this as a breach caused by unauthorized access. Early reporting quoted officials describing confidential government information as having been inappropriately accessed. Deputy minister Jeff Conrad was one of the senior officials publicly briefing the issue.

The police record was worse. After the warrant materials were unsealed, the [Halifax Examiner and Cape Breton Spectator reported that provincial employees had misled Halifax police](https://capebretonspectator.com/2018/05/08/foipop-security-fail-ns-ito/) by describing the exposed files as a hacked government system and overstating what had happened. The ITO described a complaint from provincial Corporate Security to Halifax Regional Police. From that point forward, the bad technical framing was no longer just a press line. It was part of the machinery that produced a police response.

Police arrested a teenager.

In [CBC's interview with him](https://www.cbc.ca/news/canada/nova-scotia/freedom-of-information-request-privacy-breach-teen-speaks-out-1.4621970), the teenager said he believed he was downloading public records from the province's FOIPOP portal. CBC reported that the charge carried a possible 10-year prison sentence, that police raided the family home with about 15 officers, and that computers and family devices were seized.

The tech community reacted badly because the facts, as described, did not sound like hacking. They sounded like a public-sector system that exposed records and then blamed the person who noticed.

That distinction matters because this was not only a confused nontechnical office reaching for the wrong word. Professional engineers, privacy officials, senior bureaucrats, corporate security, and communications staff all touched some part of the system or the response. The charitable version is incompetence. The public record supports at least this much: people with institutional power and technical responsibility allowed the blame to land on a teenager instead of on the system they built, approved, and defended.

Civil liberties groups agreed. The [Canadian Civil Liberties Association urged Nova Scotia to withdraw the charge](https://ccla.org/privacy/search-seizure/ccla-urges-nova-scotia-to-withdraw-charges-against-teen/), arguing that downloading publicly available data was not a crime and that prosecution would not be in the public interest.

The case collapsed quickly. [Halifax Regional Police later said there were no grounds to lay charges](https://globalnews.ca/news/4191414/halifax-police-data-breach/) and that the teen did not have intent to commit a criminal offence.

That should have been the end of the "hacker" story.

It was not the end of the accountability story.

## Source Trail

The public record was spread across local reporting, archived blog posts, advocacy letters, and national tech/security coverage.

Useful source anchors include:

1. [Global News on police deciding not to lay charges](https://globalnews.ca/news/4191414/halifax-police-data-breach/)
2. [Global News quoting me on the province jumping the gun](https://globalnews.ca/news/4177145/ns-breach-foipop/)
3. [CBC interview with the teenager accused in the breach](https://www.cbc.ca/news/canada/nova-scotia/freedom-of-information-request-privacy-breach-teen-speaks-out-1.4621970)
4. [CBC on the case resonating with programmers](https://www.cbc.ca/news/canada/nova-scotia/teen-accused-foi-website-resonates-programmers-1.4623757)
5. [The Canadian Civil Liberties Association urging withdrawal of the charge](https://ccla.org/privacy/search-seizure/ccla-urges-nova-scotia-to-withdraw-charges-against-teen/)
6. [The Halifax Examiner and Cape Breton Spectator on provincial employees misleading police](https://capebretonspectator.com/2018/05/08/foipop-security-fail-ns-ito/)
7. [The Coast piece I wrote arguing civil servants mischaracterized the incident](https://www.thecoast.ca/news-opinion/civil-servants-lied-to-the-police-and-that-needs-to-be-addressed-15178326/)
8. [Global News on Nova Scotia's Corporate Security Office and Ian Burke](https://globalnews.ca/news/9004038/nicole-gnazdowsky-person-of-interest-nova-scotia-foipop/)
9. [A 2003 crime-prevention bulletin identifying Constable Ian Burke of Halifax Regional Police](https://www.ccsd.ca/resources/CrimePrevention/pdf/bulletin_7_2003_english.pdf)
10. [My archived FOIPOP technical writeup](https://web.archive.org/web/20180416224850/https://evandentremont.com/some-information-on-the-freedom-of-information-hack/)
11. [My archived open letter to the Premier and Cabinet](https://web.archive.org/web/20180503163551/https://evandentremont.com/an-open-letter-to-the-premier-and-the-cabinet/)
12. [My archived FOIPOP conclusion](https://web.archive.org/web/20191016205033/https://evandentremont.com/a-conclusion-to-foipop/)
13. [My AtlSecCon 2018 talk, "1,2,3,4 I Declare Cyber War"](https://speakerdeck.com/evandentremont/1-2-3-4-i-declare-cyber-war)

## The Real Failure

The real failure had three layers.

First, there was the technical failure.

The portal exposed documents in a way that allowed enumeration. A basic authorization check should have made the document ID irrelevant unless the logged-in user was allowed to see that document.

Second, there was the governance failure.

Somebody approved the system. Somebody accepted its privacy posture. Somebody decided the risk was controlled. The public record later showed that senior officials, including deputy minister Jeff Conrad and CIO Sandra Cascadden, were tied to the privacy and launch process. In [The Coast, I argued](https://www.thecoast.ca/news-opinion/civil-servants-lied-to-the-police-and-that-needs-to-be-addressed-15178326/) that the Privacy Impact Assessment described weak safeguards and that the government narrative to police had mischaracterized what happened.

Third, there was the institutional failure.

Instead of immediately saying, "we exposed documents and are fixing the system," the province helped create a story about a criminal actor. That did not happen in a vacuum. It required technical failure, bureaucratic self-protection, and a handoff to police that treated the province's own characterization as fact.

That handoff is the centre of the story.

Corporate Security contacted Halifax Regional Police. The warrant materials repeated the province's language about a hacked system and confidential files being taken. Police then pursued a teenager as though a public URL enumeration problem were a criminal intrusion. That is what calling in a favour looks like inside an institution: not a movie scene, not a bag of cash, just the right office saying the right police-coded words to the right people and watching the state move.

The public record already shows a government security office using police channels to convert an embarrassing access-control failure into a criminal investigation.

That protected the institution for about five minutes. Then it made everything worse.

## My Part

I was not the main character in the FOIPOP story. The teenager and his family were the people who paid the immediate price. The journalists who kept pulling records did the hard public-interest work. Civil liberties advocates applied legal pressure. Security people across Canada explained why the government's framing was absurd.

My contribution was narrower, but real.

I wrote the technical argument in public, repeatedly, in a way the public could understand. On my old blog, I published [Regarding the Freedom of Information "hack"](https://web.archive.org/web/20180416224850/https://evandentremont.com/some-information-on-the-freedom-of-information-hack/), [an open letter to the Premier and Cabinet](https://web.archive.org/web/20180503163551/https://evandentremont.com/an-open-letter-to-the-premier-and-the-cabinet/), and later [A conclusion to FOIPOP](https://web.archive.org/web/20191016205033/https://evandentremont.com/a-conclusion-to-foipop/).

I also wrote for The Coast, where the point was blunt: the province's "hacking" story did not match the technical facts.

More specifically, the point was that calling it a hack let the province avoid responsibility. Their own breach protocol would have led to a much quieter response if the incident had been treated like exposed or misdirected records. By labeling it intentional, hostile, and criminal, the province created a path to law enforcement, search warrants, a raid, seized family devices, and a teenager facing the possibility of prison.

CBC later described the story as resonating with programmers and noted that my blog post had brought early attention to the case. That mattered because the first public explanation of a technical incident often frames everything that follows.

I also turned the argument into an AtlSecCon 2018 talk: [1,2,3,4 I Declare Cyber War](https://speakerdeck.com/evandentremont/1-2-3-4-i-declare-cyber-war). The talk walked through the policy choices that led to a 19-year-old being arrested for archiving documents from a public portal and identified where the official story fell apart.

That mattered because government failures often survive by staying boring. If the story remains "privacy incident under investigation," it disappears into process. If the story becomes "a teenager was arrested after the government exposed records through its own broken web portal," it becomes harder to bury.

That was the achievement.

Not writing a clever blog post. Not winning an argument on the internet.

Turning a technical failure into a public accountability problem.

## The Deputy Minister Problem

Deputy and associate deputy ministers usually survive by being invisible.

They are senior enough to shape decisions, but insulated enough that the public often sees only the minister. FOIPOP made that harder. Jeff Conrad's name became attached to the file. Sandra Cascadden's name became attached to the privacy and technology approvals around the portal. The question stopped being only "what did the teenager do?" and became "what did the department build, approve, say, and tell police?"

That is the part I do not want softened into a misunderstanding. The people around this file were not helplessly confused by computers. The province had professional technology leadership. It had privacy process. It had career bureaucrats whose job was to understand risk, records, procurement, operations, and public accountability. If the system exposed documents and the official response still pointed outward at a teenager, that is not merely a literacy gap. That is an institution protecting itself.

It is also why Corporate Security matters. Security offices sit at the boundary between bureaucracy and law enforcement. Staffed by people who know how police think, they can make an incident sound like a criminal matter before anyone technical has slowed the story down. In this case, the phrase "hack" did the work. It gave police a familiar role, gave the province distance from its own failure, and gave the public someone to blame.

The redactions in the warrant record mean I am not going to pretend the ITO names every person involved. But the policing context was not imaginary. Later public reporting identified Ian Burke as a Nova Scotia corporate security officer, and older public materials identify a Constable Ian Burke with Halifax Regional Police. However narrow or broad that personal connection was in this case, Corporate Security was not some ordinary help desk escalating a confusing ticket. It was a police-fluent office taking a privacy failure to police.

I am not going to pretend there is a memo saying "FOIPOP did this."

That is not how public-sector accountability leaves fingerprints.

But the practical result is still worth naming: a file that could have been treated as a temporary communications problem became attached to senior leadership. The "hack" narrative failed. The teenager was not charged. The portal stayed down for repair. The department had to answer questions publicly.

Later, when Premier Tim Houston's incoming Progressive Conservative government announced [changes to the senior ranks of the public service on August 31, 2021](https://news.novascotia.ca/en/2021/08/31/premier-announces-changes-public-service), Sandra Cascadden was listed among deputy and associate deputy ministers leaving the public service.

The release does not say FOIPOP caused that departure. It would be irresponsible to claim it did.

But the arc still matters. A senior official tied to the privacy and technology failure became part of the public record, and later left government during a change in administration. In a system that rarely prints causal accountability in plain language, that is not nothing.

That is as close to an engineering post-mortem as politics usually gets.

## Why It Worked

The FOIPOP pushback worked because the technical argument was simple.

1. Authorization is not the same thing as obscurity.
2. Public URLs are not protected records.
3. Sequential IDs are not security.
4. Downloading exposed files is not the same thing as breaking into a system.
5. Calling something a hack does not make it one.
6. Calling police does not make a system failure into a crime.

The government needed ambiguity. The response removed ambiguity.

Once enough people understood the technical shape, the moral shape changed too. The teenager looked less like an attacker and more like a convenient place to put blame. The province looked less like a victim and more like the operator of a badly designed system that had tried to launder its own failure through a criminal investigation.

That is the power of clear technical explanation. It changes who gets believed.

## What Should Have Happened

The right response would have been boring.

1. Take the portal offline.
2. Preserve logs.
3. Notify affected people.
4. Explain the access-control failure plainly.
5. Thank the person who surfaced the issue.
6. Commission an independent review.
7. Fix authorization before relaunch.
8. Publish the lessons learned.

Instead, the province took a preventable security failure and added a civil-liberties failure on top.

The arrest is what made the story national. The overreaction turned a bad web portal into a case study.

## The Lesson

FOIPOP is still one of the clearest examples I have seen of an institution converting its own system failure into an individual threat.

That pattern appears everywhere.

Bad metrics become employee problems. Bad hiring systems become candidate problems. Bad public policy becomes citizen behavior. Bad software becomes "misuse." The institution designs the maze, then blames the person who walks into the wall.

That is worse when the institution has engineers, security staff, and senior officials who should know better. The problem is not ignorance. The problem is that blame is often cheaper than accountability, and police can make blame feel official.

The FOIPOP case was different because the wall was visible.

There was a URL. There were sequential numbers. There was an arrest. There were public documents. There were officials on the record. There were journalists, lawyers, and technologists willing to say the same thing in different languages:

This was not hacking.

This was a failure to secure the system.

## Closing Thought

I am proud of the FOIPOP work.

Not because it was polite. It was not always polite.

Not because it solved Nova Scotia access-to-information culture. It did not.

I am proud of it because it took a story that powerful people wanted to classify as criminal behavior and helped reclassify it as institutional failure.

That is a real achievement.

In software terms, the bug was obvious.

The hard part was proving the owners had turned the user into the incident.
