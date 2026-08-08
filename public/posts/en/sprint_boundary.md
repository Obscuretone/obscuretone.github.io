---
title: Every Sprint Becomes Kanban
description: "Every sprint team I have joined eventually admitted that work arrives continuously. The fair contest between Scrum and Kanban is decided by which model survives contact with that reality."
tags: [software, management, agile, kanban, systems]
---

Every Agile team I have joined eventually became Kanban, usually because I kept lobbying until the board admitted what the team was already doing.

The conversion was never dramatic. Nobody dragged the sprint backlog into the parking lot and set it on fire. I asked what should happen when a production bug arrived on Wednesday, when a dependency slipped, when a ticket turned out to be three tickets, when the highest priority changed, or when Friday arrived with half the sprint still in progress.

Each honest answer weakened the boundary. Urgent work entered immediately. Unfinished work carried forward. Scope changed as people learned. Releases happened whenever they were ready. The planning and retrospective meetings often kept their two-week rhythm, but the work itself flowed continuously.

Eventually the board described Kanban while the calendar continued to say Scrum.

## The Board Was Already Telling The Truth

A sprint creates a clean story. The team chooses a goal and a body of work, concentrates for a fixed period, inspects the result, and begins again with better information. The timebox provides a beginning, an end, and a moment when everyone agrees to look up.

Most work systems are less polite.

Requests arrive while other requests are in progress. Incidents ignore planning meetings. Dependencies complete on somebody else's schedule. A small ticket reveals an architectural problem, while a large ticket collapses after one useful conversation. Product priorities change because customers, regulators, competitors, and executives do not synchronize their decisions with the second Tuesday of the sprint.

The board records those events even when the process language tries to hide them. A ticket carried into three consecutive sprints is continuous work wearing three different accounting periods. An urgent item inserted halfway through the sprint is a pull decision with ceremonial paperwork attached. A sprint backlog that changes every day is already a live queue.

My lobbying usually consisted of asking the team to believe the board.

## The Strongest Case For A Sprint

The cheap argument against Scrum treats a sprint as a locked box of tickets and then celebrates when reality breaks into it. The [official Scrum Guide](https://scrumguides.org/scrum-guide.html "software, management, agile | Scrum Guides") describes something more defensible.

The Sprint Goal is the stable commitment, while the exact scope can be clarified and renegotiated as the team learns. Developers own and update the Sprint Backlog, increments can be released before the Sprint Review, and the team is supposed to be self-managing. The fixed period creates a regular opportunity for inspection and adaptation; it does not require everyone to pretend that knowledge stops arriving for two weeks.

That model has real advantages. A coherent Sprint Goal can protect a team from randomization. It gives several people one outcome around which to coordinate instead of allowing each person to pull an unrelated ticket. A timebox limits planning horizon, creates a dependable review cadence, and forces product work to become small enough to inspect. The boundary can also tell stakeholders that a new request will receive attention soon without requiring the team to abandon its current objective immediately.

Scrum is especially plausible when the team owns a product, can form a meaningful short-term goal, has the skills needed to complete it, and can defer most interruptions. Under those conditions, the sprint is a shield around focused work rather than a bucket into which management throws a fortnight of promises.

The distinction matters because many arguments for Kanban are really arguments against badly implemented Scrum. A team whose managers dictate scope, add work constantly, treat estimates as commitments, and punish carryover would remain unhealthy after somebody removed the sprint field from Jira.

## Where The Timebox Meets Reality

The strongest case for Kanban begins when the work refuses to form a coherent batch.

Support, operations, infrastructure, security, maintenance, and platform teams often receive work as a stream of unrelated demands with different urgency and size. A production incident cannot wait for sprint planning. A certificate expiry should not be ignored because the current Sprint Goal concerns observability. A blocked migration may need nothing for four days and then immediate attention when another team finally completes its part.

Those teams can still invent a Sprint Goal, but the goal may describe only a fraction of what they are responsible for. The rest of the work enters as exceptions until the exceptions become the operating model.

Carryover is the clearest signal. An unfinished item crossing a sprint boundary has not changed merely because the reporting period ended. Re-estimating it, returning it to the backlog, and selecting it again can create the appearance of a fresh decision while the same work continues with the same risks and dependencies. Repeated carryover means either the team needs smaller work items or the sprint is measuring a flow it does not control.

Interruptions provide another test. A sprint is useful when incoming work can wait without unacceptable consequences. Continuous flow is more honest when work must be considered as it arrives. No workshop, certification, or team preference can decide which environment exists; the arrival pattern can be observed.

## Kanban Is More Than Removing The Sprint

Calling an unplanned ticket queue Kanban would repeat the exact mistake described in [Agile Has Never Been Tried](/posts/en/agile_has_never_been_tried). Removing sprint boundaries does not create flow by itself.

The [Kanban Guide](https://kanbanguides.org/the-kanban-guide/ "software, management, kanban | Kanban Guides") requires teams to define and visualize their workflow, actively manage items, control work in progress, and improve the system. It also requires four flow metrics: WIP, throughput, work-item age, and cycle time. A service-level expectation uses historical cycle-time data to forecast how long work will probably take.

That changes the central question. Sprint planning asks what the team believes it can complete during the next timebox. Kanban asks how much work the system can safely contain and what the observed flow says about completion. One protects a goal for a period; the other protects capacity continuously.

WIP limits were usually the part I actually wanted. Starting work feels productive, so teams start too much of it. Each additional item divides attention, creates another queue, and increases the chance that something old becomes invisible. A WIP limit makes capacity a shared constraint. When the limit is reached, the team has to finish, unblock, split, swarm, or explicitly break its own policy before pulling more work.

The resulting measurements are less theatrical than velocity. Cycle time records how long completed work actually took. Work-item age identifies current items drifting beyond the team's normal range. Throughput counts completions over time, while WIP shows how much unfinished inventory the system is carrying. None of those metrics can prove that the team selected valuable work, but together they make claims about movement testable.

That emphasis fits broader delivery research. DORA's guidance says [working in small batches](https://dora.dev/capabilities/working-in-small-batches/ "software, delivery, flow | DORA") shortens feedback loops and predicts software-delivery and organizational performance when combined with capabilities such as visible work and customer feedback. Both Scrum and Kanban can produce small batches, but Kanban makes batch size and queue size impossible to treat as background details.

## The Case Against My Own Preference

Kanban can describe reality accurately and still optimize the wrong reality.

A continuous queue can become a machine for processing whatever shouts loudest. Without a shared product goal, the team may complete many small tickets while avoiding the larger change that would make those tickets unnecessary. Cycle time can become another target to game by slicing work strangely, neglecting difficult items, or preferring easy completions. A WIP limit can be overridden so often that it becomes decorative, which turns the board into Jira with fewer date fields.

Scrum supplies a coordination mechanism that Kanban does not prescribe: one objective for the team during a fixed period. Kanban can add goals, planning cadences, reviews, and retrospectives, but those additions matter. A team doing product discovery or building a coherent feature may benefit from asking whether its combined work produced an outcome rather than whether individual items flowed efficiently.

The research does not justify declaring a universal winner. A 2017 [statistical comparison of Scrum and Kanban](https://doi.org/10.1016/j.rcim.2015.12.001 "software, research, kanban | Elsevier") found Kanban only slightly better on the schedule factor in its survey data. A later [structured synthesis of Kanban studies](https://link.springer.com/article/10.1186/s40411-018-0057-1 "software, research, kanban | Springer") found substantial evidence for better work visibility, control, flow, and time to market, but it also identified organizational culture as an important condition and found less confidence around some social effects.

Even a case study reporting improvements during a [transition from Scrum to Scrumban](https://doi.org/10.1109/ICSSP.2012.6225959 "software, research, kanban | IEEE") concluded that continuous improvement and well-trained, committed people could create durable gains with or without adopting a new method.

That is inconvenient evidence for anyone selling the method as the result. Kanban can reveal a system, but it cannot make people respond to what they see. Scrum can create a protected objective, but it cannot make management respect the protection.

## What I Was Actually Lobbying For

I was never particularly interested in abolishing meetings every two weeks. A regular review is useful. Retrospectives are useful when they can change something. Product conversations need a cadence, and humans benefit from occasionally declaring a chapter complete.

The objection concerned using that cadence as the ontology of the work.

A review every second Friday does not mean work naturally forms two-week batches. A planning meeting does not mean the arrivals have stopped. A sprint forecast does not create capacity, and moving an unfinished ticket into the next sprint does not renew it.

The useful hybrid keeps whichever cadences help people coordinate while allowing work to move according to capacity. Replenishment can happen when the ready queue needs attention. Reviews can happen every two weeks. Retrospectives can inspect flow data and working relationships. An expedite policy can describe the rare work allowed to violate normal order. A WIP limit can prevent every stakeholder from converting importance into immediate parallel work.

People often call that Scrumban, which is a convenient name for admitting that frameworks are components rather than religions. I mostly called it making the board accurate.

## Reality Gets The Final Vote

Scrum and Kanban are models of work. The better model is the one whose assumptions survive observation.

When a team can pursue one meaningful goal, protect it from interruption, renegotiate scope without losing the objective, and inspect a useful increment at a regular boundary, a sprint describes reality well. Kanban adds little by deleting a boundary that is genuinely helping.

When work arrives continuously, priorities cannot wait, items vary widely, dependencies ignore the calendar, and carryover is routine, flow describes reality better. A sprint adds little by redrawing the same queue every two weeks.

That conclusion is objective in the modest engineering sense. The team can measure arrival rates, interruption frequency, WIP, cycle-time distributions, throughput, carryover, blocked time, and whether Sprint Goals remain stable and meaningful. The framework does not get to overrule the measurements.

Every team I joined moved toward Kanban because its work had already moved there. I kept winning the argument because reality had done the difficult part before I arrived.

I never turned a sprint team into Kanban. I convinced it to describe itself accurately.
