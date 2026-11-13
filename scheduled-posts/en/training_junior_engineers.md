---
title: "Is Training Junior Engineers Actually Worth It"
description: "Training juniors can pay for the employer. A retained-contribution model and a two-company game separate private returns from industry underinvestment."
titleformat: "prose"
published: "2026-11-13T09:17:00-05:00"
sourcesCheckedAt: "2026-11-13T01:02:33Z"
tags: ["engineering", "training", "economics", "game-theory"]
---

Yes, training juniors can pay for the employer doing it. Game theory does not overturn that result. It explains why a training programme can be profitable for one company while the industry still produces less training than it benefits from.

The distinction matters. “Someone needs to train juniors” is a collective argument. “This programme earns more than our alternatives” is an investment argument. A company can accept the first and reject a particular programme on the second.

There is an old CFO-and-CEO joke:

> “What if we train our workers and they leave?”
>
> “But what if we don’t train them, and they stay?”

The [Milken Institute Review recounts that exchange as a joke](https://www.milkenreview.org/articles/its-time-to-build-21st-century-companies), not as a verified quotation from Henry Ford. It captures a real omission: refusing to train people has a cost too. It does not establish that every training budget, or every decision to hire a junior, is profitable.

## Juniors produce work while they learn

A junior's salary is not the cost of training them. They are an employee doing work, not an empty investment account waiting to become a senior.

The employer's cost includes supervision, review, equipment and mistakes, alongside compensation. Their useful contribution offsets that cost. After they become more effective, the employer captures only the contribution they produce before leaving, net of what it costs to employ them.

There is empirical evidence that this distinction matters. Germany's BIBB cost-benefit survey for the 2022/2023 training year reports average annual gross costs of €26,210 per apprentice and returns of €18,124, leaving €8,086 in net costs. Returns exceeded costs for about 26% of apprentices in that surveyed year. Those are apprenticeship results across occupations, not estimates for Canadian software juniors. They demonstrate that useful work during training is a substantial part of the economics, and sometimes covers the training cost before retention after qualification enters the calculation. [BIBB report, pages 3–5](https://www.bibb.de/dienst/publikationen/download/21068)

Other institutional settings produce different results. A study comparing Austrian and Swiss apprenticeship data reports average annual net benefits in the Swiss sample and net costs in the Austrian sample. Training is not inherently charity or inherently profitable; its design and employment context affect the answer. [Moretti and colleagues](https://www.iza.org/publications/dp/11081/none)

## The actual break-even question

A simple investment model makes the decision clearer:

`expected net value = r × B − C`

C is the net cost of developing an entrant after crediting useful work during development. B is the additional net benefit captured if they qualify and remain through a defined earning period. Both amounts are measured on the same present-value basis. r is the joint probability of reaching that outcome. In this deliberately simple version, other outcomes produce no additional B.

Suppose C is $40,000, B is $80,000 and r is 70%. These are illustrative assumptions, not industry averages:

`0.70 × $80,000 − $40,000 = $16,000`

The programme has positive expected value. Its break-even probability is 50%. At 40%, it loses $8,000 under those assumptions.

This is how “what if they leave?” belongs in the calculation: as a probability affecting the benefit the employer captures. It is not a reason to assume the benefit is zero. Useful work performed before departure still counts.

But positive value is only the first test. If an experienced hire delivers $24,000 in expected net value over an equivalent period and capacity requirement, that alternative beats the $16,000 training case. If the feasible alternative delivers $10,000, training wins. If the team needs expertise immediately, delayed capability can make the training option unsuitable even when its eventual return is positive.

An external hire also has recruiting costs, ramp-up time, a chance of failure and a chance of leaving. Comparing a junior's entire salary with a senior's recruitment fee is not a comparison of equivalent investments.

So the firm-level answer is specific: training pays when its retained contribution exceeds its net cost, and it is the best choice when that return also beats the feasible alternatives. A software team without contribution, mentoring and retention data cannot honestly turn that into a universal industry percentage.

## What game theory adds

Transferable skills create a benefit the training employer does not necessarily capture. A later employer can use capability it did not pay to develop. Acemoglu's model of training in frictional labour markets describes this spillover and the resulting possibility of underinvestment. [Training and Innovation in an Imperfect Labour Market](https://economics.mit.edu/sites/default/files/publications/training-innovation-imperfect-labor-market.pdf)

Here is a deliberately stylized two-company game. Each training decision costs 60 units, creates 40 units of benefit for the training firm and 30 for the other firm. These are invented payoffs, not estimated hiring-market returns. A no-training decision adds no cost or benefit. Each table entry gives A's payoff first, then B's.

| | B trains | B does not train |
|---|---:|---:|
| A trains | 10, 10 | −20, 30 |
| A does not train | 30, −20 | 0, 0 |

Both firms prefer the outcome where both train to the outcome where neither trains. Yet each firm improves its own payoff by declining to train, whichever choice the other makes. Under these assumptions, neither training is the equilibrium. This toy example has the ordering of a prisoner's dilemma.

It establishes a possible incentive problem. It does not establish that these are the payoffs facing software companies.

Change the benefit captured by the training firm from 40 to 80, leaving cost at 60, and training becomes individually worthwhile even when the other company contributes nothing. The firm earns 20 units from its own investment. Other employers benefiting does not erase that return.

That is the answer to the apparent contradiction: **free-riding can cause underinvestment without making every training investment irrational.** Labour-market models also explain how employers can rationally fund general training under imperfect competition. [Acemoglu and Pischke](https://www.nber.org/papers/w6740)

## A plausible mechanism is not a measured explanation

It would be too convenient to blame weak junior hiring entirely on poaching. An OECD review finds little evidence of employers reporting that concern as a major training constraint in its case studies; it also cites English survey evidence showing low reported incidence. That does not disprove the mechanism. It limits a claim that the mechanism explains what employers actually do. [OECD, Training in Enterprises](https://www.oecd.org/en/publications/training-in-enterprises_7d63d210-en/full-report/component-8.html)

The practical response follows the economics. Productive learning assignments and efficient mentoring reduce C. A job worth staying in raises the share of benefits the company captures. Shared training infrastructure can reduce how much of a transferable investment rests on one employer. None requires preventing workers from moving.

Training juniors is cost-effective when the work and retained capability justify the investment. Game theory supports taking that return seriously and recognizing the spillovers. It does not support assuming that hiring somebody else's trained engineer is always cheaper, or that a company owes itself a loss merely because the industry needs a pipeline.
