---
title: "Why Does a Jira App for Ten People Need a License for Everyone"
description: "Atlassian standard Marketplace billing counts the whole instance. A specialist tool can acquire an organization-wide denominator."
titleformat: "prose"
published: "2026-11-25T09:17:00-05:00"
sourcesCheckedAt: "2026-11-13T01:02:33Z"
tags: ["atlassian", "jira", "marketplaces", "pricing"]
---

A team finds a Jira app that solves a small problem. Ten people need it. The organization has hundreds of licensed Jira users. Under Atlassian's standard Marketplace billing model as documented on November 12, 2026, the app's billable population is the whole instance, not the ten people using that feature.

That is not an administrator misunderstanding the pricing page. Atlassian describes the standard model explicitly: customers pay for every user in the parent application instance, regardless of how many use the Marketplace app. [Forge billing models](https://developer.atlassian.com/platform/forge/licensing-overview/)

This is a remarkably effective way to turn a small workflow improvement into a procurement decision.

## The denominator is the product

The official documentation illustrates the rule with a hypothetical 500-user Jira instance and an app charging $2 per user per month. The resulting $1,000 bill applies even when only 50 people actively use the app. That is Atlassian's illustrative example, not a quote for a particular product.

Expressed per active app user, that example is $20 a month. The advertised unit and the unit of actual use differ by a factor of ten. Progressive pricing or a different price schedule changes the bill, but does not remove the basic distinction between instance population and app usage. [Standard billing example](https://developer.atlassian.com/platform/forge/licensing-overview/)

A vendor can reasonably argue that an app provides indirect value to people who never open it. A workflow validator can protect shared data. An administrative tool can save work across the instance. Per-user use is not always the best measure of value.

But that argument has to fit the product. A feature used by a small specialist group does not become valuable to every employee merely because they share a Jira instance.

## Even the collection can change the population

Atlassian's support documentation gives another concrete example. A Marketplace app attached to a 25-user Confluence subscription is moved into a collection on a site with 100 Jira users. Its pricing basis becomes 100 users.

The example does not require the app to acquire 75 new active users. The subscription structure changes the denominator. [Marketplace app billing within a collection](https://support.atlassian.com/subscriptions-and-billing/docs/understand-billing-for-cloud-apps)

This is the sort of detail a small per-user price conceals. A buyer needs the applicable population, billing cycle and actual total. A feature comparison that ignores those terms is incomplete even when every feature description is accurate.

## Permissions do not necessarily reduce the bill

Limiting a feature to a small group answers an access-control question. The [Marketplace licensing rules](https://www.atlassian.com/licensing/marketplace) still determine the billable population.

That is why “only ten people need access” can be a perfectly reasonable product requirement and an ineffective pricing argument. Technical scope and commercial scope are separate boundaries.

The same distinction makes a generic cheapest-app list unreliable. An app may be economical for broad use across a small instance and difficult to justify for a narrow team inside a large one. The buyer's situation determines which comparison matters.

## Atlassian recognizes the alternative

The documentation also describes user-based billing, where administrators grant access to a subset of users and the organization pays for that subset. In the documentation inspected for this article, that model is an Early Access Program for building and testing in non-production environments; Marketplace publishing and pricing are not presented as generally available through it. [User-based billing status and scope](https://developer.atlassian.com/platform/forge/licensing-overview/)

That matters because it prevents two easy exaggerations. It is wrong to say Atlassian has no concept of app-specific access and billing. It is also wrong to present the documented EAP as an option every customer can select for an existing production Marketplace subscription.

The distinction is visible in the platform's own explanation. Standard billing prices the whole instance. User-based billing prices a granted subset. Those models produce different incentives for specialized software.

## A marketplace tax on narrow problems

Calling it a tax is an analogy, not a claim about government revenue. The platform's commercial rules impose an extra scale factor on a tool whose relevant audience may be much smaller than its host application.

That changes how products are sold. A small feature needs to justify an instance-wide budget. A vendor has an incentive to describe broader organizational value. A buyer has a reason to resist another app even when the feature is useful.

None of that proves a particular vendor's price is unfair. Support, security and maintenance cost real money. It does mean that the sticker price per user is a poor substitute for understanding who counts as a user for billing.

The interesting question is not whether a Jira app is expensive in the abstract. It is why solving a problem for ten people is priced against everyone sharing the system. Atlassian's standard billing rules supply a clear answer about how it happens. They do not, by themselves, establish that the resulting bill matches the value of the job being done.
