---
title: Agile Has Never Been Tried
description: Bad Agile keeps the rituals and removes the autonomy. Then everyone acts surprised when the ceremonies do not produce adaptability.
tags: [software, management, agile, incentives, work]
---

Agile and communism both have manifestos. There: that is the entire political comparison, and already more ideology than sprint planning deserves.

Every failed implementation comes with someone standing nearby saying, "that was not real Agile." The line is annoying because it sounds like a dodge and, even more annoyingly, is sometimes true.

Most organizations do not implement Agile. They implement its meeting schedule inside the same command structure they had before.

The team gets the ceremonies while management keeps control. Everyone is told they are empowered, then handed a roadmap, a deadline, a dependency graph, a quarterly planning ritual, a velocity target, and a Jira workflow with seventeen statuses. When the whole thing fails, someone announces that Agile does not work.

The defence is too convenient to accept automatically. It is also sometimes correct: if a process keeps the ceremonies and removes the authority to respond to change, it has discarded the operational premise.

## The Manifesto Was Not Jira

The [Agile Manifesto](https://agilemanifesto.org/) is short enough to read during a standup, which is funny because many standups have done more damage to Agile than any waterfall Gantt chart ever managed.

The manifesto values:

1. individuals and interactions over processes and tools
2. working software over comprehensive documentation
3. customer collaboration over contract negotiation
4. responding to change over following a plan

It is a small doctrine, and it fits badly inside a project-management subscription, a burndown chart, or a scrum master asking everyone to say what they did yesterday in front of a ticket board while eight adults quietly dissociate.

The original idea was that software work is uncertain, feedback matters, working systems teach you things plans cannot, and teams need enough autonomy to adapt when reality proves the plan wrong.

That is a good idea and an intolerable one for many organizations.

## The Ceremonies Survived

Bad Agile keeps the parts that are easy to observe: standups, sprint planning, nominal retrospectives, story points, velocity, and backlog grooming. Calling the last activity refinement did not make it less spiritually damp. What disappears is the part about authority.

The team is not allowed to change scope in any meaningful way. The roadmap is already sold. The date is already promised. The dependencies are already late. The architecture is already compromised. The staffing plan is already optimistic. The customer feedback is filtered through five layers of people who do not maintain the system.

The team is "Agile" in the same way a treadmill is travel: there is movement, but the scenery does not change.

## Control Wants The Costume Of Trust

The hard part of Agile is trust, not process.

If a team is supposed to respond to change, then the team must be allowed to change something.

The [official Scrum Guide](https://scrumguides.org/scrum-guide.html) supports this reading: it calls Scrum Teams self-managing, says they decide who does what, when, and how, and allows scope to be clarified and renegotiated as more is learned.

In practice, that authority includes:

1. changing scope, sequence, estimates, or technical approach
2. saying no or deleting work
3. revisiting commitments when new information arrives
4. telling management that a planning-room promise relied on a fantasy version of the codebase

This is where many organizations quietly defect: they want the responsiveness of trust without giving up the comfort of control.

They want developers to self-organize inside a box whose dimensions were chosen somewhere else. They want uncertainty converted into estimates, estimates converted into commitments, commitments converted into dashboards, and dashboards converted into executive confidence.

Then they call the dashboard Agile because the columns have friendly names.

## Velocity Is Where The Rot Shows

Story points can be useful inside a team.

A team can use them as a private calibration tool: this feels bigger than that, this has unknowns, this is risky, this probably needs to be split.

The moment velocity becomes a management target, the game is over.

Velocity gets mistaken for productivity, value, and throughput. In practice, it is a local accounting convention used by a particular team at a particular time under particular assumptions.

Treating velocity as productivity is like treating a restaurant's order numbers as nutrition. You can make the number go up without proving that anyone ate well.

Once velocity is managed upward, teams learn the usual survival skills: they inflate estimates, split tickets differently, avoid uncertain work, hide maintenance, pull in safe stories, move complexity out of visible scope, and make the sprint look healthy while the system gets worse.

That is measurement doing what measurement does when it becomes a target, not some special outbreak of developer dishonesty.

The team adapts to the system measuring it. Congratulations: you made them Agile.

## The Retrospective Is The Tell

The retrospective is where you can tell whether an organization believes its own process.

A real retrospective can change the system; a fake one can only produce action items, and the difference is enormous.

If the team says "we are overloaded" and the answer is "let's improve ticket hygiene," the retrospective is theater.

If the team says "deployments are dangerous" and the answer is "please add more detail to the release checklist," the retrospective is theater.

If the team says "the deadline is impossible" and the answer is "what can we descope without changing the date," the retrospective is at least trying.

If the team says "the deadline is impossible" and the organization changes the promise, that is adaptation.

Most companies want the emotional release of feedback without the cost of responding to it, so the retrospective becomes a pressure valve. People name problems, the problems become process improvements, the improvements become chores, and the chores become evidence that leadership is listening while nothing important changes.

## Waterfall With Daily Confession

The funniest failure mode is when Agile becomes waterfall with more meetings.

The organization still commits to a large fixed scope up front, treats the date as sacred, discovers requirements late, punishes teams for surfacing risk, and measures progress by obedience to the plan. Everyone now has to provide a status update every morning, so agility has left the building and surveillance has acquired sticky notes.

Waterfall at least had the decency to admit that management wanted a plan.

Bad Agile wants the plan, the certainty, the control, the reporting, and the blame surface, while also claiming the moral freshness of adaptability.

The result is merely a more frequent version of the same management system.

## Real Agile Is Expensive

The [principles behind the Agile Manifesto](https://agilemanifesto.org/principles.html) say business people and developers should work together daily, teams should be built around motivated individuals, and the best architectures and designs emerge from self-organizing teams.

Those principles are not free. They require product people who can make decisions, engineers trusted enough to make tradeoffs, customers close enough to provide real feedback, and management willing to hear bad news early. They also require technical investment, because a team cannot respond quickly if every change demands archaeology, negotiation, and a blood sacrifice to the integration environment. Most of all, they require slack, which is where the dream usually dies.

Adaptability needs slack. A system running at 100% utilization cannot adapt. It can only queue pain.

Google's SRE guidance treats overload as a condition that systems must be designed to handle, including by [degrading gracefully and shedding load](https://sre.google/workbook/overload/). A work system needs the human equivalent: spare capacity to absorb surprises instead of passing every shock directly to a queue.

If every developer is fully allocated, every sprint is packed, every deadline is tight, and every plan assumes nothing surprising will happen, the organization has already chosen fragility.

Calling that system Agile only makes its failures arrive in two-week increments.

## The Half-Assed Version Cannot Work

If you half-ass the implementation, it does not work, but the funny part is what "half-assed" means here.

A half-implemented version may perform every ceremony. The failure occurs when an organization adopts the vocabulary of autonomy while preserving the structure of command.

The recognizable symptoms are feedback that cannot alter commitments, estimates paired with punishment for uncertainty, teams held accountable for outcomes they cannot control, and demands for adaptation from people who cannot adapt the plan.

The deeper problem is authority wearing a methodology lanyard.

## Agile Has Been Tried Locally

Real Agile exists, usually in pockets: a small team with a clear mission, a product owner who can decide, engineers who can talk directly to users, a codebase with enough test coverage to make change survivable, a manager who treats bad news as information instead of disobedience, and a planning process that can absorb reality without making someone lose face. Those teams can move beautifully without much ritual.

They need alignment, trust, feedback, technical competence, and permission to change course.

The process is almost boring when it works: work in small pieces, show the thing, learn, adjust, and keep the system healthy enough that further adjustment remains possible. That is the whole trick.

It is simple in the same way eating well and exercising are simple.

The instructions fit on a page; the hard part is becoming the kind of organization that can follow them.

## Closing Thought

Agile did not fail because standups are silly, though many standups are silly.

Agile failed because companies wanted adaptability without redistributing authority to the people closest to the work.

They wanted fast feedback without changed plans, empowered teams without team power, and working software accompanied by comprehensive reporting about why it did not match the fantasy roadmap.

When someone says "that was not real Agile," they may be unbearable and correct at the same time.

Bad Agile keeps the parts management could safely adopt without changing itself.
