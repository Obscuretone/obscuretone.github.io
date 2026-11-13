---
title: "The WordPress Plugins Almost Nobody Uses Are More Interesting Than You Think"
description: "Beer maps, poetry scoring and chess games reveal why a directory installation bucket tells us less than a product story."
titleformat: "prose"
published: "2026-11-11T12:00:00-05:00"
sourcesCheckedAt: "2026-11-13T01:02:33Z"
tags: ["wordpress", "plugins", "data", "software"]
dateAssignedRetrospectively: true
---

There is a WordPress plugin called [Beers I Drank](https://wordpress.org/plugins/beers-i-drank/). Its stated job is to keep track of beers and show a map of the provinces they come from. In the November snapshot I examined, it sat in the fewer-than-ten-installations bucket.

I respect the specificity. Most software pitches spend three paragraphs pretending to transform an industry. This one knows what it is for.

It is also a better entry into WordPress's long tail than a list of losers. A tiny installation counter can describe an unsuccessful product, a private itch or a genuinely useful tool for a very small audience. The count does not tell us which.

## Thirty thousand small audiences

The pinned [November directory snapshot](https://github.com/souleater2023/wplists/commit/bb25b37a5dca95db39ce2d6c9f33d42f2b1e8180) contains 78,763 unique slugs. Of those, 30,087 have an active-installation value of zero: 38.2% of the file.

Zero here is a display bucket. WordPress renders the smallest count as fewer than ten, so the file does not identify 30,087 completely unused plugins. Nor can it tell us which member of that bucket is the literal least used. [WordPress's display implementation](https://github.com/WordPress/WordPress/blob/master/wp-admin/includes/class-wp-plugin-install-list-table.php)

The statistic is a snapshot result, not a live count. I independently downloaded the pinned JSON, matched its Git blob identity and checked row and unique-slug totals. The individual product descriptions below come from their public WordPress listings. That separates what the product says it does from how many installations the historical file reports.

## A poetry slam does not need a million customers

[Poetry Slam Manager](https://wordpress.org/plugins/poetry-slam-manager/) describes score entry, automatic scoring and publication of slam results into WordPress posts and pages. Its description includes different slam formats and time penalties.

That is a real workflow, even if the audience is small. A local event does not become a bad use of software because its scoring system lacks venture-scale adoption.

The snapshot lists the plugin's added date as March 9, 2012, and its update timestamp on that same day. Its installation value is in the smallest bucket. Those facts establish a long-standing listing with little reported adoption at the observation date. They do not establish whether the code works on a current event site or whether it ever had a larger audience.

The interesting question is what this kind of tool represents: someone encoded a very particular procedure and put it in a directory available to everyone. The ordinary startup-success vocabulary does a poor job of describing that act.

## The directory contains its own archaeology

[Text Filter Suite](https://wordpress.org/plugins/text-filter-suite/) appears in the same small bucket, with an added date of December 10, 2004. It describes a framework for building text filters and applying them to posts and comments.

That makes it the earliest-added listing in the snapshot's zero-value bucket. It does not mean it spent every intervening year below ten installations. We do not have that history.

Still, the juxtaposition is excellent: a plugin old enough to vote, sharing a rounded adoption category with projects released a few days before the snapshot. A single counter flattens twenty years of context into the same label.

[Bednar Chess Replay](https://wordpress.org/plugins/bednar-chess-replay/) makes the other side of that comparison. Its snapshot added date is November 2, 2026. Its public description identifies it as an add-on for embedded chess replay frames, rather than a replacement chess engine. Being in a small bucket shortly after release tells a very different story from an old listing with the same count.

## Popularity is the wrong measure for some jobs

The temptation is to ask why these products failed to acquire ten users. That question silently assumes each was a commercial product seeking a large audience, and that the snapshot reveals its entire history. Neither assumption follows from the data.

A WordPress directory is also a distribution channel for small acts of software. A person solves a problem, publishes the result and makes it available to someone with the same problem. Some of those projects grow. Some remain obscure. Some become historical artifacts.

This does not make every low-adoption plugin worth installing. Compatibility, security and maintenance still need examination. [WordPress's compatibility warnings](https://developer.wordpress.org/plugins/wordpress-org/alerts-and-warnings/) describe one signal; adoption is another, and neither replaces checking the actual dependency.

But a catalogue containing beer maps, slam scoring and chess replay tools is more interesting than a graveyard statistic. The long tail includes software made because somebody wanted a particular thing to exist. A small counter cannot tell us whether that was a failure.
