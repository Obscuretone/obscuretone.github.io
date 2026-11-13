---
title: "Half the WordPress Directory Has Gone Two Years Without an Update"
description: "A dated public census shows half the observed listings without a release for more than 730 days. Installation-weighted use tells a different story."
titleformat: "prose"
published: "2026-11-21T09:17:00-05:00"
sourcesCheckedAt: "2026-11-13T01:02:33Z"
tags: ["wordpress", "data", "maintenance", "plugins"]
---

In a public snapshot of 70,909 WordPress plugins, 35,602 had gone more than 730 days without a recorded update. That is 50.2% of the observed directory.

The number is striking. It also needs its denominator. It describes plugin listings, not half of WordPress websites or half of the software people actually use.

The underlying data comes from [hafenstudios' August 28, 2026 census](https://hafenstudios.com/en/census/01-2026/). I downloaded its public lookup and aggregate files, checked the record count and unique slugs, and reproduced the age counts. This is analysis of an identifiable historical dataset, not a claim that I independently crawled the live directory.

## The age distribution

The reference time is August 28, 2026 at 21:56:30 UTC. These are strict greater-than comparisons against the lookup's `tage_seit_release` field, the source’s age-since-update measure:

| Time without a recorded update | Listed plugins | Share of 70,909 |
|---|---:|---:|
| More than 365 days | 41,395 | 58.4% |
| More than 730 days | 35,602 | 50.2% |
| More than 1,825 days | 28,174 | 39.7% |
| More than 3,650 days | 14,955 | 21.1% |

These groups overlap: the oldest entries are included in every shorter threshold. The raw lookup makes the comparisons reproducible. The five- and ten-year labels are shorthand for the stated day counts, not exact calendar anniversaries. [Public lookup TSV](https://hafenstudios.com/census/01-2026/census-slugs.tsv), [aggregate JSON](https://hafenstudios.com/census/01-2026/census-01-2026.json)

Even the boundary matters. At least 730 days produces 35,611 records; more than 730 produces 35,602. Nine plugins sit exactly on that threshold. A headline can round the percentage, but the method needs to say which comparison it uses.

## The quiet tail is not evenly distributed

The same file lets us compare update age with installation buckets. Using more than 730 days throughout gives this result:

| Reported installation group | Plugins | Without a release for more than 730 days | Share within group |
|---|---:|---:|---:|
| Fewer than 10 | 24,043 | 9,250 | 38.5% |
| 10–999 | 39,851 | 25,042 | 62.8% |
| 1,000–9,999 | 4,816 | 1,137 | 23.6% |
| 10,000–99,999 | 1,733 | 164 | 9.5% |
| 100,000 or more | 466 | 9 | 1.9% |

These are listing counts grouped by the source's rounded installation values. They are not exact counts of sites. The smallest bucket also contains recent entries, so a low age share there is not evidence of stronger maintenance over time. This is a cross-section, not a comparison of matched-age products. [Source fields and limitations](https://hafenstudios.com/en/census/01-2026/#daten)

The contrast is still clear. The group between ten and a thousand reported installations contains most of the long-quiet entries. Among the products in the largest installation group, the same age threshold applies to a much smaller proportion.

That is why the source's installation-weighted result differs so much from its listing share. Its published bounds place plugins above the 730-day threshold at 2.0–4.3% of active installations in the dataset. Those bounds are the source's calculation from bucketed counts. They are not a measured share of websites. [Published census table](https://hafenstudios.com/en/census/01-2026/)

## What an old date establishes

These dates are listing metadata. They need not correspond to a new code release. Age establishes the age of the metadata being measured. It does not establish that a plugin is broken, vulnerable or abandoned.

A stable utility may do one small job without much change. A stale timestamp can also belong to a dependency whose maintainer is no longer available. The same field accommodates both stories.

WordPress's own warning concerns testing against its latest three major releases. That compatibility declaration is useful, but it is not an independent security assessment either. [Plugin alerts and warnings](https://developer.wordpress.org/plugins/wordpress-org/alerts-and-warnings/), [why the old time-based warning changed](https://make.wordpress.org/plugins/2018/02/13/not-updated-in-warning/)

For a site owner, the practical problem is responsibility: who responds when a dependency stops doing its job? A case study needs source activity, support history, relevant advisories and an actual workflow check. A directory percentage cannot supply those answers for every plugin.

## The directory has two different stories

By product count, WordPress has a large historical tail. By reported use, much of the weight sits elsewhere. Treating those as the same story makes the headline more alarming and the analysis less useful.

The reproduced data supports a precise criticism of the catalogue: half of this dated population had gone more than 730 days without a recorded update. It does not support saying half of WordPress runs abandoned code.

The distinction is the interesting part. The directory preserves a huge amount of software history while users concentrate on a much smaller part of it. A useful maintenance argument has to account for both.
