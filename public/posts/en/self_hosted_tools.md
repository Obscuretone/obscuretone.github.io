---
title: "Four Tools I Self-Host"
description: How Nira, Nonfluence, Nailgun, and NTKA handle project work, documentation, outbound mail, and sign-in on the same server.
published: "2026-11-21"
image: nira-release-checklist.png
imagealt: "Nira's browser interface showing a release checklist ticket and a sidebar of demo projects."
imagecaption: "A ticket in Nira, opened directly in its project workspace. The screenshot uses fictional project data."
imagesource: "Screenshot of a local Nira demo."
tags: [software, architecture, self-hosting, mcp]
---

I use four small tools to keep track of projects, write down what I learn, send mail from the applications, and sign in. I run them on the same server. Each has a separate job, which makes it easier to tell where a problem belongs and what needs to be backed up.

## Nira for work

[Nira](https://github.com/Obscuretone/nira) is where a next action becomes a ticket. I can open it on a board, in a project list, or from a link in a chat. That link opens inside the same workspace, so I can still see the project and the work around it.

Coding agents use MCP to look up issues and projects. A client with write access can record a decision, change a status, or add a next action to the same issue I see in the browser. The [Nira project note](/posts/en/nira) traces that idea back to the original CLI experiment.

## Nonfluence for what we learn

[Nonfluence](https://github.com/Obscuretone/nonfluence) holds the durable material that tickets point to. A release ticket can say what needs doing. The wiki can hold the rollout procedure, the reasoning behind it, and the rollback steps someone will need six months later.

Pages use Markdown and have a history. They can link to parent and child pages, show backlinks, and reference Nira work. I keep personal documentation and company material in separate spaces. A page's stable address gives both a person and an agent a place to start.

## Nailgun for outbound mail

[Nailgun](https://github.com/Obscuretone/nailgun) accepts outbound messages from applications and puts them into a MariaDB queue. The sender gets a queue ID. A worker handles delivery through an SMTP relay, and a caller can check the outcome later. An idempotency key lets the caller retry the same submission without creating a duplicate message.

This is useful for WordPress and small services that need to submit email without each carrying its own SMTP configuration. The queue also gives me somewhere to look when a form says it submitted a message and the mail has yet to arrive.

## NTKA for sign-in

[NTKA](https://github.com/Obscuretone/ntka) is the passkey identity provider. I can register a site, grant an invited guest access to that site, and let the guest sign in with their own passkey. The launcher shows the applications available to the signed-in account. Sites connect through OpenID Connect and manage their own browser sessions.

## Where the boundaries help

If a release needs work, I can track it in Nira, link the procedure in Nonfluence, and open either page after signing in. If an application needs to send mail, Nailgun handles that separately. Each repository now has a screenshot from a local demo. The code is public on GitHub. The hosted applications still require their own authorization.
