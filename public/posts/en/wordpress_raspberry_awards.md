---
title: "The WordPress Raspberry Awards Have Winners"
description: "Four named winners from pinned directory metadata, including a 2004 update and a thirty-thousand-install shortcode utility."
titleformat: "prose"
published: "2026-11-11T12:00:00-05:00"
sourcesCheckedAt: "2026-11-13T01:02:33Z"
tags: ["wordpress", "plugins", "satire", "data"]
dateAssignedRetrospectively: true
---

Welcome to the WordPress Raspberry Awards, where the timestamps are old, the installation counters are rounded and no plugin is accused of being a security hole merely for surviving a long time.

This edition uses a pinned [November 2026 directory snapshot](https://github.com/souleater2023/wplists/commit/bb25b37a5dca95db39ce2d6c9f33d42f2b1e8180). I downloaded the JSON, checked its identity and counted 78,763 unique slugs. The winners below follow explicit metadata criteria. These are awards for a dated catalogue, not claims that every entry still functions or has continuously held the same audience.

## The Jurassic Release Award

**Winner: [Protect old posts](https://wordpress.org/plugins/protect-old/)**

The snapshot records its last update on December 26, 2004. Among records with a plausible dated update, that is the earliest calendar date in the file.

The public description says it password-protects every post except the latest one, using a password specified in the plugin's PHP file. That is an unusually literal approach to keeping the past private. The timestamp also makes the plugin itself a fairly serious contribution to the past.

The award recognizes the timestamp. It does not establish that no work happened elsewhere, that the software is unsafe or that anybody should install it.

## The Small Audience Endurance Award

**Winner: [Text Filter Suite](https://wordpress.org/plugins/text-filter-suite/)**

Its added date is December 10, 2004, making it the earliest-added listing in the snapshot's fewer-than-ten bucket. It describes a framework for constructing and applying text filters.

A framework for making filters is a more ambitious project than the counter suggests. But the counter is not a lifetime audience record. This award does not claim nobody ever came; it recognizes the oldest listing found in this particular small bucket.

WordPress does not provide enough precision to name a least-used winner inside that bucket. The honest trophy is therefore extremely old and has an uncertain number of people attending the ceremony. [Installation display implementation](https://github.com/WordPress/WordPress/blob/master/wp-admin/includes/class-wp-plugin-install-list-table.php)

## The Still Installed Somehow Award

**Winner: [Azigen](https://wordpress.org/plugins/azigen/)**

Restrict the snapshot to plugins with a reported installation bucket of at least 1,000, and the earliest update date belongs to Azigen: December 15, 2008. Its bucket is 1,000.

Its Hungarian-language description identifies dashboard widgets connected to the Azigen site. The fact that a narrow integration has an old date and a nontrivial installation bucket is a better mystery than another generic list of supposedly essential plugins.

Installed is the operative word. The snapshot cannot establish whether those installations deliver useful behavior. I am awarding the combination in the data, not certifying a successful modern dashboard integration.

## Lifetime Achievement in Not Touching the Release Button

**Winner: [My Plugins](https://wordpress.org/plugins/my-plugins/)**

Among snapshot entries with at least 10,000 reported installations, My Plugins has the earliest update timestamp: July 2, 2013. Its installation bucket is 30,000.

The description explains a small job: put a shortcode in a post or page to display a table of plugins. There is a pleasing symmetry to a plugin about plugins becoming a case study in how long plugins remain in the directory.

The small scope is also a reason to resist the obvious cheap shot. A product that does one stable job may need fewer releases than a sprawling platform. Age makes the entry notable; it does not prove neglect.

## A Raspberry With a Receipt

The four results are reproducible from the pinned file: earliest update date, earliest added date within the smallest bucket, earliest update among entries at or above 1,000 installations, and earliest update at or above 10,000.

Installation values are buckets, not exact users. Timestamps are metadata, not security tests. WordPress's own compatibility notice is about testing against recent major releases, and does not label old code inherently vulnerable. [WordPress warnings](https://developer.wordpress.org/plugins/wordpress-org/alerts-and-warnings/)

That leaves us with something funnier than pretending every old plugin is garbage: an enormous software catalogue where a tiny shortcode utility can retain a substantial reported footprint while the rest of the industry congratulates itself for shipping constantly.
