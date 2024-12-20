---
title: Tell me about the last time you broke production.
image: trial_by_fire.jpg
imagealt: The classic meme, a dog in a room on fire, "this is fine"
description: This article explores the best question I've learned to ask when interviewing software engineers.
---

It's a simple question, but it reveals a lot. Over the years, I’ve interviewed countless developers—junior, mid-level, and senior. And when I ask this question, I can tell instantly who’s seasoned and who's green, regardless of how polished their résumé might look.

Some might say it's a trick question, but in reality, it's a litmus test. In my view, if you've never broken production—or at least made a serious mistake that impacted your team or users—you probably haven't been in the trenches long enough to call yourself a senior developer. After all, breaking production is practically a rite of passage in software development.

## Why this question?

First of all, I don’t believe anyone who claims they’ve never shipped a bug. Code is complex, humans are fallible, and systems are unpredictable. The best devs aren’t the ones who have a perfect track record—they’re the ones who’ve made mistakes and learned from them.

Breaking things shows:

1. **You’ve taken ownership**: Only developers who work on production code with real-world consequences are in a position to break things.
2. **You’ve been trusted**: Junior devs might not have enough responsibility yet to make production-impacting mistakes. The fact that you’ve been in a position to break things shows you’ve been trusted with meaningful work.
3. **You’ve been through fire**: You’ve dealt with on-call panic, frantic bug fixes, and the pressure of rollback. These are all important experiences that shape a mature developer.

## The best stories come from breaking things

Let’s be honest: the best war stories in software come from moments of complete panic. No one remembers a smooth release as vividly as they remember the one where the entire production environment went down and they had to scramble for a fix while hundreds (or thousands!) of users were affected.

And if you're a senior developer, you're bound to have more than one such story. I certainly do—though the details seem to blur into one endless firefight of frantic fixes and post-mortem discussions. Whether it was a misconfigured environment, a forgotten edge case, or something as simple as a rogue ; in the wrong place—I've been there.

One of my more notable bugs happened in a complicated financial calculation system, almost like cell phone billing, but for field equipment that wasn’t always connected. The system had a concept of eventual consistency. It was correct 99.99% of the time and passed all our test cases. But we had a subtle edge case—a discrepancy between an initial plan and a later revision—that wasn’t caught, and this caused a minimum usage charge to be calculated incorrectly.

Most of the mistakes were minor—just a few cents. But in some of the worst cases, the errors totaled in the thousands. In the end, it cost the company a few thousand dollars. Sales had to step in and, on a case-by-case basis, decide whether to waive the charge or correct the bill. Good, reliable customers tended to get their charges waived. There’s a lesson there, too.

## The real test: debugging weird production-only issues

While breaking production is one thing, the *real* badge of seniority comes when you find yourself facing bugs that only occur in production. You know the type—those weird, unpredictable issues that refuse to manifest in dev or staging, no matter how hard you try to replicate them.

This is where the magic happens. Fixing these kinds of issues requires a whole new level of system understanding and troubleshooting skills. You can’t just rely on the familiar, controlled environment of staging. Production is messy, full of live user data, real-world network traffic, and all kinds of subtle configuration differences that can make even a seemingly small bug rear its head in unpredictable ways.

These types of bugs separate the experienced from the rest.

## Why these issues only show up in production

There are plenty of reasons why some bugs only appear in production:

1. **Scale**: Your dev environment might not have the same amount of traffic or data as your production environment. What works fine for a few users can break down at scale.
2. **Environment Differences**: Dev and staging are often simplified versions of production—fewer machines, different configurations, or missing integrations.
3. **Concurrency**: You rarely simulate real-world concurrency and race conditions in staging, but in production, everything happens at once.
4. **Real Data**: Production often has far messier data than your test databases, where everything is structured nicely. In production, users enter garbage data, unexpected formats, and push your system in ways you never anticipated.

That’s what makes these bugs so much more interesting. They force you to zoom out and see the system as a whole, understanding how each part interacts under real-world conditions.

## The art of debugging in production

When you’re debugging something that only happens in production, you have to be methodical. It's not just about reading stack traces or logs—sometimes it’s about understanding the entire ecosystem your code operates in.

In these situations, a senior developer knows:

* **How to dig deep into logs**: You need to know exactly where to look for clues, and often that means sifting through a massive volume of logs.
* **Where the hidden bottlenecks are**: You might need to check network latency, database performance, or other external services to identify bottlenecks or failures.
* **How to use monitoring tools effectively**: Knowing how to work with performance monitoring and error tracking tools is crucial to zeroing in on the issue.
* **How to isolate variables**: You can’t just reproduce the issue in a nice, controlled environment. You have to systematically isolate the problem using feature flags, traffic mirroring, or rolling out patches to a small subset of users first.

Sometimes, these bugs make you question everything you thought you knew about the system. It requires a deep understanding of how your application, databases, network, and services all interact at scale.

## What this teaches you

The ability to debug these weird, one-off production issues is a hallmark of a senior dev. It’s a skill that’s honed over time, as you gain a broader understanding of the system you’re working with and become better at seeing the interconnectedness of things.

The lessons learned from these debugging experiences:

* **Systems Thinking**: Senior developers understand that no bug exists in isolation. Production is an ecosystem where everything is interdependent.
* **Deep Knowledge**: You can’t debug what you don’t understand. It’s these production issues that push developers to learn the nuances of databases, network layers, and the quirks of different services.
* **Patience and Persistence**: Debugging production issues requires methodical investigation and persistence. It’s easy to get lost in the weeds, but staying calm and following the data is key.
* **Humility**: Debugging these elusive problems teaches humility. Sometimes it’s not your code, but an external service, or an environment quirk. But as the one responsible, you have to navigate through all that complexity to fix the issue.

## Correlation doesn't imply causation—but it works

“Correlation doesn’t imply causation,” as the saying goes, but I can tell you this: **this question has never led to a bad hire**. Maybe I’m missing out on the developers who write truly bug-free code. One person even told me he tests so thoroughly that there *can’t* be bugs in his work.

And maybe he’s right! But I couldn't help but wonder—if you're spending all that time testing to perfection, how much time are you actually spending *writing* code? There’s a balance to be struck, and while testing is crucial, the reality is that systems are messy, unpredictable, and always evolving.

The best developers know this and have learned to adapt to the chaos.

![This is fine.](/images/trial_by_fire.jpg "This is fine.")

## Breaking and fixing production is a rite of passage

As I mentioned earlier, breaking production is a rite of passage for any senior developer. But digging into weird, production-only bugs? That’s when you really separate the pros from the rest. These issues force you to go beyond the code and think about the system as a whole.

If you’ve never had to troubleshoot a production-only bug, brace yourself. It’s only a matter of time before the complexity of your system throws something at you that dev and staging simply can’t simulate. When that day comes, embrace the challenge—these are the moments that teach you the most about being a truly senior developer.
