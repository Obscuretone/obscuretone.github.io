---
title: Agile Has Never Been Tried
description: Bad Agile keeps the rituals and removes the autonomy. Then everyone acts surprised when the ceremonies do not produce adaptability.
tags: [software, management, agile, incentives, work]
---

Agile and communism both have manifestos.

There. That is the entire political comparison, and already more ideology than sprint planning deserves.

Every failed implementation comes with someone standing nearby saying, "that was not real Agile."

This is annoying because it sounds like a dodge.

It is also annoying because sometimes it is true.

Most organizations do not implement Agile. They implement its meeting schedule inside the same command structure they had before.

The team gets the ceremonies. Management keeps the control. Everyone is told they are empowered, then handed a roadmap, a deadline, a dependency graph, a quarterly planning ritual, a velocity target, and a Jira workflow with seventeen statuses.

Then the whole thing fails and someone says Agile does not work.

The defence is too convenient to accept automatically. It is also sometimes correct: if a process keeps the ceremonies and removes the authority to respond to change, it has discarded the operational premise.

## The Manifesto Was Not Jira

The [Agile Manifesto](https://agilemanifesto.org/) is short enough to read during a standup, which is funny because many standups have done more damage to Agile than any waterfall Gantt chart ever managed.

The manifesto values:

1. individuals and interactions over processes and tools
2. working software over comprehensive documentation
3. customer collaboration over contract negotiation
4. responding to change over following a plan

That is a small doctrine.

It fits badly inside a project-management subscription, a burndown chart, or a scrum master asking everyone to say what they did yesterday in front of a ticket board while eight adults quietly dissociate.

The original idea was that software work is uncertain, feedback matters, working systems teach you things plans cannot, and teams need enough autonomy to adapt when reality proves the plan wrong.

That is a good idea.

It is also intolerable to many organizations.

## The Ceremonies Survived

Bad Agile keeps the parts that are easy to observe.

Standups survive.

Sprint planning survives.

Retrospectives survive, at least formally.

Story points survive.

Velocity survives.

Backlog grooming survives, though calling it refinement did not make the activity less spiritually damp.

What disappears is the part about authority.

The team is not allowed to change scope in any meaningful way. The roadmap is already sold. The date is already promised. The dependencies are already late. The architecture is already compromised. The staffing plan is already optimistic. The customer feedback is filtered through five layers of people who do not maintain the system.

The team is "Agile" in the same way a treadmill is travel.

There is movement.

The scenery does not change.

## Control Wants The Costume Of Trust

The hard part of Agile is trust, not process.

If a team is supposed to respond to change, then the team must be allowed to change something.

The [official Scrum Guide](https://scrumguides.org/scrum-guide.html) supports this reading: it calls Scrum Teams self-managing, says they decide who does what, when, and how, and allows scope to be clarified and renegotiated as more is learned.

That means changing scope.

Changing sequence.

Changing estimates.

Changing technical approach.

Saying no.

Deleting work.

Revisiting commitments when new information arrives.

Telling management that the thing promised in a planning meeting was based on a fantasy version of the codebase.

This is where many organizations quietly defect.

They want the responsiveness of trust without giving up the comfort of control.

They want developers to self-organize inside a box whose dimensions were chosen somewhere else. They want uncertainty converted into estimates, estimates converted into commitments, commitments converted into dashboards, and dashboards converted into executive confidence.

Then they call the dashboard Agile because the columns have friendly names.

## Velocity Is Where The Rot Shows

Story points can be useful inside a team.

A team can use them as a private calibration tool: this feels bigger than that, this has unknowns, this is risky, this probably needs to be split.

The moment velocity becomes a management target, the game is over.

Velocity gets mistaken for productivity, value, and throughput. In practice, it is a local accounting convention used by a particular team at a particular time under particular assumptions.

Treating velocity as productivity is like treating a restaurant's order numbers as nutrition.

You can make the number go up.

That does not mean anyone ate well.

Once velocity is managed upward, teams learn the usual survival skills. Inflate estimates. Split tickets differently. Avoid uncertain work. Hide maintenance. Pull in safe stories. Move complexity out of visible scope. Make the sprint look healthy while the system gets worse.

That is measurement doing what measurement does when it becomes a target, not some special outbreak of developer dishonesty.

The team adapts to the system measuring it.

Congratulations.

You made them Agile.

## The Retrospective Is The Tell

The retrospective is where you can tell whether an organization believes its own process.

A real retrospective can change the system.

A fake retrospective can only produce action items.

The difference is enormous.

If the team says "we are overloaded" and the answer is "let's improve ticket hygiene," the retrospective is theater.

If the team says "deployments are dangerous" and the answer is "please add more detail to the release checklist," the retrospective is theater.

If the team says "the deadline is impossible" and the answer is "what can we descope without changing the date," the retrospective is at least trying.

If the team says "the deadline is impossible" and the organization changes the promise, that is adaptation.

Most companies want the emotional release of feedback without the cost of responding to it.

So the retrospective becomes a pressure valve.

People name problems.

The problems are translated into process improvements.

The process improvements become chores.

The chores become evidence that leadership is listening.

Nothing important changes.

## Waterfall With Daily Confession

The funniest failure mode is when Agile becomes waterfall with more meetings.

The organization still commits to a large fixed scope up front.

It still treats the date as sacred.

It still discovers requirements late.

It still punishes teams for surfacing risk.

It still measures progress by whether the plan is being obeyed.

But now everyone has to provide status updates every morning.

Agility has left the building.

Surveillance now has sticky notes.

Waterfall at least had the decency to admit that management wanted a plan.

Bad Agile wants the plan, the certainty, the control, the reporting, and the blame surface, while also claiming the moral freshness of adaptability.

The result is not more humane.

Only more frequent.

## Real Agile Is Expensive

The [principles behind the Agile Manifesto](https://agilemanifesto.org/principles.html) say business people and developers should work together daily, teams should be built around motivated individuals, and the best architectures and designs emerge from self-organizing teams.

Those principles are not free.

They require product people who can make decisions.

They require engineers trusted enough to make tradeoffs.

They require customers or users close enough to provide real feedback.

They require management willing to hear bad news early.

They require technical investment, because a team cannot respond to change quickly if every change requires archaeology, negotiation, and a blood sacrifice to the integration environment.

They require slack.

That last one is where the dream usually dies.

Adaptability needs slack. A system running at 100% utilization cannot adapt. It can only queue pain.

Google's SRE guidance treats overload as a condition that systems must be designed to handle, including by [degrading gracefully and shedding load](https://sre.google/workbook/overload/). A work system needs the human equivalent: spare capacity to absorb surprises instead of passing every shock directly to a queue.

If every developer is fully allocated, every sprint is packed, every deadline is tight, and every plan assumes nothing surprising will happen, the organization has already chosen fragility.

Calling that Agile does not make it adaptive.

It makes the failure arrive in two-week increments.

## The Half-Assed Version Cannot Work

If you half-ass the implementation, it does not work.

But the funny part is what "half-assed" means here.

A half-implemented version may perform every ceremony. The failure occurs when an organization adopts the vocabulary of autonomy while preserving the structure of command.

It means feedback exists, but cannot alter commitments.

It means estimates exist, but uncertainty is punished.

It means teams are accountable for outcomes they cannot meaningfully control.

It means management wants adaptation from people who are not allowed to adapt the plan.

The deeper problem is authority wearing a methodology lanyard.

## Agile Has Been Tried Locally

Real Agile does exist.

You usually find it in pockets.

A small team with a clear mission.

A product owner who can actually decide.

Engineers who can talk directly to users.

A codebase with enough test coverage to make change survivable.

A manager who treats bad news as useful information instead of disobedience.

A planning process that can absorb reality without needing someone to lose face.

Those teams can move beautifully.

They do not need much ritual.

They need alignment, trust, feedback, technical competence, and permission to change course.

The process is almost boring when it works.

Work in small pieces.

Show the thing.

Learn.

Adjust.

Keep the system healthy enough that adjustment remains possible.

That is the whole trick.

It is simple in the same way eating well and exercising are simple.

The instructions fit on a page.

The hard part is becoming the kind of organization that can follow them.

## Closing Thought

Agile did not fail because standups are silly, though many standups are silly.

Agile failed because companies wanted adaptability without redistributing authority to the people closest to the work.

They wanted fast feedback, but not changed plans.

They wanted empowered teams, but not team power.

They wanted working software, but also comprehensive reporting about why the working software was not matching the fantasy roadmap.

So yes, when someone says "that was not real Agile," they are often being unbearable.

They may also be correct.

Bad Agile keeps the parts management could safely adopt without changing itself.
