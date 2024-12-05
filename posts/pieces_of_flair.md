---
title: Anything That is Measured, is Measured.
image: 51_flair.webp
imagealt: People Scrambling to Increase Stats 
description: This article explores the pitfalls of over-relying on metrics and performance indicators, arguing that while measurement is crucial for improvement, an excessive focus on numbers can lead to misleading conclusions and superficial success.
---

I came across a tagline for a marketing research company called *L'Observateur* while walking down the street the other day: "Tout ce que l'on mesure s'améliore," which translates to "Everything that is measured improves." At first glance, it seems to make sense; after all, focusing on metrics often drives improvement and efficiency. This concept is echoed in the film [*Office Space*](https://www.youtube.com/watch?v=3_fG_zLbBeU), where the characters grapple with the impact of excessive measurement and corporate metrics on their work lives.

In the movie, the relentless pursuit of quantifiable performance metrics leads to absurdities and frustrations, revealing the pitfalls of overemphasizing numbers. The film illustrates that while measurement can indeed lead to improvement, it can also create a superficial veneer of success while ignoring deeper issues. Similarly, in real-life scenarios, especially in industries like software development, an overfocus on metrics can obscure genuine performance challenges and create a misleading picture of progress.

![Measurement above all else](/images/51_flair.webp "Measurement above all else")


# The Zero-Sum Game of Metrics

[Metrics](https://en.wikipedia.org/wiki/Software_metric) and [KPIs](https://www.forbes.com/advisor/business/what-is-a-kpi-definition-examples/) are tools are designed to keep organizations on track, ensuring goals are met and progress is made. But in reality, they often transform into zero-sum games. 

>Zero-Sum Game: a situation in which one person or group can win something only by causing another person or group to lose it 
>
>- *[Merriam Webster](https://www.merriam-webster.com/dictionary/zero-sum%20game)*

In a zero-sum game, one person's gain is another's loss. When we apply this concept to metrics, achieving one goal frequently comes at the expense of another. The problem is that metrics, by their very nature, are reductionist. They focus on specific, quantifiable outcomes while ignoring the broader context.

# Theories on Measurement

This issue isn’t new. Economists and social scientists have long recognized the dangers of over-reliance on metrics. [Goodhart’s Law](https://en.wikipedia.org/wiki/Goodhart%27s_law) states, 

>When a measure becomes a target, it ceases to be a good measure.

In other words, once you set a metric as a goal, people will optimize for that metric—even if it means subverting the original intention behind it.

[Campbell’s Law](https://en.wikipedia.org/wiki/Campbell%27s_law) goes a step further, warning that 

>The more any quantitative social indicator is used for social decision-making, the more subject it will be to corruption pressures and the more apt it will be to distort the social processes it is intended to monitor.

Essentially, when metrics become the focal point, they encourage gaming the system, sometimes leading to outright dishonesty.

# Real World Examples

## Tech Support

During university, I worked part-time at an Apple call center, a role that taught me a great deal about both the technical and human aspects of customer service. One of the most closely monitored metrics was the length of time spent on each call. Given my familiarity with both the tools and the products we supported, I consistently had a lower handle time compared to my colleagues. That efficiency, however, became a point of contention. I was written up for having an “out of spec” handle time; which seemed counterintuitive. When I questioned this decision, my manager argued:

>You are creating an unrealistic expectation of future support capabilities

That is a direct quote. 

At the time, I was much younger and had been in the role longer than most, having spent about three years in the call center. I was committed and well-acquainted with the job, which allowed me to handle calls quickly and effectively. However, this efficiency was seen as a problem rather than a strength. It was a challenging and somewhat frustrating position to be in.

In response to the demands, which in my mind was clearly to waste the customers’ time, I adapted in my own way. I began putting customers on hold and occupying myself with tasks like playing [Tetris in emacs](https://apple.stackexchange.com/questions/103600/using-the-terminal-command-and-emacs-to-play-the-video-game-tetris), or bathroom breaks, just to keep my handle time higher. This was obviously not allowed, but [netstat](https://www.unix.com/man-page/osx/1/netstat/) is a thing.

My next review was positive, and I received a raise. The experience highlighted the absurdity of valuing metrics over genuine service quality. A week after the review, I left the call center to manage an electronics store on an interim basis. Looking back, I see the situation as a formative experience, teaching me the importance of balancing metrics with meaningful work and not letting rigid targets undermine the essence of true performance.

## Engineering Directors

I’ve witnessed the pitfalls of over-reliance on metrics firsthand in a particularly striking case involving a director at a previous company. This director faced pressure to meet automated reporting on things like lines of code written, and jira comments written. On paper, the metrics appeared impressive, with high numbers of comments in Jira, lines of code written, and low rework. However, these figures were ultimately meaningless, as they did not reflect the true value or effectiveness of the work being done.

Ironically, upper management, allegedly fully aware of the director’s data manipulation, remained indifferent as long as the numbers met their targets. To them, the appearance of success was sufficient, and they had little concern for the actual quality of work or the broader implications of the manipulated metrics. The last I heard, he is now in charge of this monitoring company-wide.

This disconnect between reported numbers and genuine performance highlights a fundamental issue with an overemphasis on metrics: it can obscure real problems and create a false sense of achievement, ignoring the deeper issues that impact the effectiveness and integrity of the work being done.

Another director employed a curious strategy with agile sprints. Whenever new tasks were added to a sprint, existing items were quietly removed. This tactic kept the total number of hours allocated to the sprint constant, giving a misleading impression that the team was meeting its objectives and staying on track.

Compounding the issue was the director’s focus on avoiding conflict with his peers. By manipulating the visible data, he created an illusion of productivity while failing to address the real challenges the team faced. The constant shifting of goals without clear data to justify these changes led to significant frustration among team members, who struggled with an ever-changing workload.

Despite the mounting issues, upper management remained satisfied with the favorable metrics, which painted a distorted picture of success. This disconnect between superficial metrics and the actual work environment highlights a critical flaw in relying solely on numbers: it can obscure real challenges and issues, creating a facade of success while failing to address the underlying problems that impact performance and morale.

# Objective and Key Results (OKRs)

[OKRs](https://peoplelogic.ai/blog/history-of-objectives-and-key-results) are a popular framework used by organizations to set and achieve goals. Unlike traditional metrics like KPIs, which often focus on specific outputs or activities, OKRs are designed to align the entire organization around measurable outcomes that drive meaningful progress. An Objective represents a significant, qualitative goal that the organization aims to achieve, while Key Results are specific, quantitative measures that track progress toward that objective. The key distinction between OKRs and KPIs lies in this focus on *outcomes* rather than just outputs. Where KPIs might track how many tasks were completed, OKRs push for understanding the impact those tasks have on broader goals.

The strength of OKRs lies in their emphasis on results over activity. By prioritizing the impact of work rather than the mere completion of tasks, OKRs encourage teams to think critically about the value they are delivering. For instance, instead of measuring success by the number of features released (a typical KPI), an OKR might measure how much those features improved user satisfaction or increased customer retention. This shift in focus ensures that efforts are aligned with the organization's strategic objectives and that teams are working toward outcomes that truly matter. OKRs challenge organizations to ask, "What difference are we making?" rather than just, "What are we doing?"

>“OKRs have helped lead us to 10x growth, many times over. They've helped make our crazily bold mission of "organizing the world's information" perhaps even achievable. They've kept me and the rest of the company on time and on track when it mattered the most."

[*Larry Page**, Co-founder of Google.*](https://www.cnbc.com/2018/08/14/this-goal-setting-method-is-used-by-bill-gates-larry-page-and-bono.html)

The value of OKRs depends heavily on their implementation. While OKRs provide a more holistic view by focusing on results, they are not immune to the pitfalls of overemphasis on measurable outcomes. If not carefully managed, even OKRs can lead to tunnel vision, where teams focus only on what is easily measurable, neglecting equally important but less quantifiable aspects of their work. For OKRs to be effective, organizations must remain vigilant against the temptation to chase numbers at the expense of genuine progress. The key is to use OKRs as a guide for prioritization and alignment, rather than as rigid targets that overshadow the bigger picture.

# The Implications of Return-to-Office Mandates

In the context of remote work, the current trend towards Return-to-Office (RTO) mandates reveals a significant disconnect between what is being measured—shareholder value—and actual productivity and employee satisfaction.

## Layoffs and RTO: A Convenient Strategy

Faced with the negative perception of layoffs, some companies have leveraged RTO as a means to reduce their workforce without the stigma associated with direct job cuts. This strategy allows organizations to effectively phase out employees under the guise of a return to in-person work. 

- **Talent Drain**: Ironically, the most qualified employees—those who are often the most sought after—are likely to seek opportunities elsewhere if forced back into the office. These individuals can easily find remote positions that offer the flexibility and work-life balance they desire, leading to a significant loss of top talent.

## The Productivity Argument

Research consistently shows that remote workers tend to be happier and more productive. Studies indicate that the flexibility of working from home leads to increased job satisfaction, lower stress levels, and better overall performance. By prioritizing RTO, companies risk undermining these benefits.

- **Real-World Performance Impact**: RTO mandates, designed to bolster a company's image and stimulate local economies, often do not translate into improved productivity. Instead, they can create dissatisfaction and disengagement among employees who thrive in remote work environments.

## Economic Motivations Behind RTO

A driving force behind RTO initiatives is the need to support downtown economies and mitigate the financial burden of unused real estate. Companies with empty office spaces face significant liabilities, prompting them to push for employees to return in order to justify these expenses.

- **Facade of Stability**: While these actions may appear beneficial on paper, they do little to address the real-world implications for employee morale and productivity. The focus remains on maintaining shareholder value and financial metrics rather than fostering a culture that values effective work practices and employee well-being.

Ultimately, the push for RTO highlights the need for organizations to reassess their measurement priorities. By focusing on superficial metrics designed to appease shareholders, companies risk alienating their workforce and sacrificing long-term productivity for short-term gains. The challenge lies in finding a balance that recognizes the importance of both employee satisfaction and the broader economic context, rather than adhering to outdated notions of workplace success.


# Closing Thoughts

Measurement is essential; without it, we'd be navigating in the dark. However, when measurements become the goal rather than a tool, they can distort reality and produce unintended consequences. While numbers provide valuable insights, they rarely tell the whole story. The challenge lies in using metrics wisely. Understand their limitations, the trade-offs they involve, and the behaviors they encourage. 

Much like in *Office Space*, where the number of [pieces of flair](https://www.youtube.com/watch?v=F7SNEdjftno) you wear becomes a superficial measure of your worth, focusing too narrowly on quantifiable metrics can skew our view of success.

Ultimately, the aim should be genuine improvement, not just checking boxes or meeting arbitrary targets.
