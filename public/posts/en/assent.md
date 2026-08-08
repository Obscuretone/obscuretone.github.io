---
title: "return assent;"
titleformat: code
image: rt_cat_crown.webp
imagealt: "A cat beside a Royal Assent desk and ceremonial stamp machinery."
imagecaption: "The Crown's ordinary assent path, reduced to a ceremonial endpoint with a cat-shaped operator."
imagesource: "AI-generated illustration created for obscuretone with OpenAI image generation."
description: The Crown is symbolically enormous, constitutionally important, and in ordinary legislative processing behaves like a service dependency expected to return assent.
tags: [government, canada, institutions, legacy-systems, monarchy]
---

My cat could perform most of the Crown's ordinary legislative function with almost no change to existing law or process. The claim is a constitutional joke delivered with a straight face, but it also supports a serious architecture review.

Canada is a constitutional monarchy, which means Parliament is not just the House of Commons and the Senate. Constitutionally, Parliament includes the monarch. A federal bill becomes law only after it passes both chambers and receives Royal Assent.

That sounds powerful, although normal operation is mostly ceremonial.

The [Senate's procedural note on Royal Assent](https://sencanada.ca/en/about/procedural-references/notes/n6/) describes Royal Assent as the process by which a bill adopted by both houses becomes law. The [Royal Assent Act](https://laws-lois.justice.gc.ca/eng/acts/R-8.6/FullText.html) allows assent to be signified in Parliament or by written declaration.

In other words, there is a formal interface that usually does not make decisions.

## The Ordinary Path

In the ordinary path, the algorithm is simple:

1. Parliament passes a bill.
2. Parliament presents the bill for assent.
3. The Crown assents.
4. The bill becomes law.

Replace "Crown assents" with "cat sits near written declaration" and the user-visible system mostly keeps working.

Constitutional scholars may object that the cat lacks legal personality, cannot act on ministerial advice, cannot appoint a governor general, cannot dissolve Parliament, cannot understand responsible government, cannot read supply bills, and may have conflicts of interest involving canned food.

Those are fair objections, but they mostly prove the point.

The ordinary legislative-processing role is not where the Crown's day-to-day meaning lives. The Crown is symbolically enormous, legally embedded, and historically load-bearing. But in routine bill passage, the system mostly expects the endpoint to return `assent`.

Calling that endpoint a monarch feels generous; operationally, it is a dependency.

## The Endpoint And The Power

The absurdity is useful because it separates two things that are usually blurred together.

One question concerns the formal constitutional object called the Crown; another concerns the work it performs during ordinary operation. Keeping those questions separate makes the architecture easier to see.

A system can have a dependency that is formally critical and operationally boring. Payroll may depend on an ancient server that does almost nothing. A bank may have a mainframe transaction path nobody wants to touch. A government may require a ceremonial assent process that almost never exercises discretion.

The dependency matters because the system will not complete without it, even though invocation rarely involves a meaningful policy decision. The Crown is more important and less active than it looks: the legal system routes authority through it, while modern responsible government expects it to act on advice in ordinary cases.

## The Cat Test

The cat test is simple:

If a ceremonial office is replaced by an indifferent mammal for normal operations, how long does the public notice?

For Royal Assent, the answer might be "not immediately." Bills would still pass both chambers, paperwork would still be processed, the Gazette would still publish, public servants would still implement programs, and courts would still interpret statutes.

Most people would never see the step where authority became legally complete.

That invisibility is the point: the Crown's relevance is mostly hidden, and hidden dependencies are where legacy systems get interesting.

## The Fallback Path Is The Problem

The cat cannot handle the fallback path, which is where the joke stops being enough.

Reserve powers exist. Conventions constrain them. The legal constitution and the practical constitution are not identical. Most of the time, the ceremonial layer does what democratic government expects. But the emergency branches still exist in the source tree.

Canada has historical examples. At the federal level, early post-Confederation bills were sometimes reserved for imperial consideration. According to the [Centre for Constitutional Studies](https://www.constitutionalstudies.ca/2019/07/reservation-and-disallowance/?print=print), between 1867 and 1878, 21 federal bills were reserved and six were denied Royal Assent by the United Kingdom; no federal bills have been reserved since. At the provincial level, reservation and disallowance survived longer, with the last reservation occurring in Saskatchewan in 1961.

Australia gives the Commonwealth warning comment. In 1975, [Governor-General Sir John Kerr dismissed Prime Minister Gough Whitlam during a supply crisis](https://www.nma.gov.au/defining-moments/resources/whitlam-dismissal). A reserve-power event like that shows the ceremonial layer becoming consequential when the system enters an unusual state.

The cat argument matters because the Crown usually does so little visible work that people forget the emergency branch exists. Its normal path makes the office look replaceable, while the fallback path makes casual replacement dangerous.

## Symbolic Authority Is Still Architecture

Engineers are trained to be suspicious of components that are both critical and poorly understood, and the Crown is exactly that kind of authority abstraction.

It gives the state continuity across elections. It separates the legal personality of government from the temporary people holding office. It lets courts, ministers, prosecutors, soldiers, public servants, and legislatures act in the name of something older than the current cabinet.

That abstraction has value as well as cost.

The cost is conceptual debt. Citizens are told that the monarch is symbolic, the governor general is ceremonial, Royal Assent is automatic, conventions are binding, and reserve powers are theoretical.

All of that is mostly true, and "mostly true" is where legacy systems live.

## The Better Question

My cat's constitutional fitness is the wrong question. The cat obviously lacks discipline, accountability, bilingual capacity, media training, and respect for constitutional convention.

The interesting question is why the ordinary path makes the comparison work at all.

If the practical legislative role can be described as an endpoint expected to return `assent`, then we should be honest about what the endpoint is for.

Democratic legitimacy comes from elections and confidence in the House of Commons, while ordinary Royal Assent contributes little policy judgment. The stronger justifications are legal continuity, some measure of constitutional safety, and an inherited ceremony wrapped around a fallback path nobody wants to test.

That is why the cat joke reaches past itself and exposes the shape of the system. The Crown is symbolically enormous, operationally routine, and architecturally load-bearing.

And if a component can be boring for decades, then suddenly matter during a crisis, it deserves more scrutiny than "tradition" or "ceremony" usually receives.
