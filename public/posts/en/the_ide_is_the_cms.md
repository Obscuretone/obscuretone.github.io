---
title: The IDE Is The CMS
description: A project note on publishing obscuretone from an IDE with Markdown, Git, a Next.js static export, GitHub Actions, GitHub Pages, and a custom domain.
published: "2026-08-08"
tags: [software, publishing, github, nextjs, architecture]
---

This site is a project, not just the place where the other projects get described.

[obscuretone.github.io](https://github.com/Obscuretone/obscuretone.github.io "software, publishing, github | Site source on GitHub") is built so I can write, preview, revise, and publish without leaving an IDE. The editor is the writing surface, Markdown is the content format, Git is the revision history, GitHub Actions is the build machine, and GitHub Pages is the host.

There is no separate content-management system. The repository is the content-management system.

## The Publish Button Is A Push

A post begins as a Markdown file under `public/posts/en`. Its front matter supplies the title, description, tags, and optional image metadata. The rest is ordinary Markdown, so writing a post uses the same tools as writing code: search, diffs, branches, previews, and commits.

The complete path from a saved draft to the public site is:

```text
IDE
  -> Markdown, JavaScript, and CSS in the repository
  -> Git commit
  -> push to main
  -> GitHub Actions runner
  -> Next.js static export in out/
  -> GitHub Pages deployment artifact
  -> obscuretone.com
```

That makes publishing deliberately boring. I do not paste a finished article into an admin panel after working on it somewhere else. The draft and the published source are the same file, and the commit that changes the writing is also the event that begins publication.

## What Next.js Builds

The site uses Next.js, but it does not run a Next.js server in production. The [`output: 'export'` setting](https://github.com/Obscuretone/obscuretone.github.io/blob/main/next.config.js "software, github, nextjs | Static export configuration") tells `next build` to produce a directory of static HTML, CSS, JavaScript, and other assets.

[Next.js describes a static export](https://nextjs.org/docs/app/guides/static-exports "documentation, software, nextjs | Next.js static export guide") as a build that generates an HTML file for each route and writes the deployable result to `out`. That is the important boundary: Next.js is part of the publishing toolchain, while the public site is only files.

During the build, the site scans the Markdown directory and creates a route for every post. It reads front matter, converts Markdown to HTML, adds syntax highlighting and section metadata, and assembles the index. Build-time code can read the repository because it runs inside the Actions job; none of that filesystem access has to exist after deployment.

The site also derives publication and update dates from Git history. That is why the workflow performs a full checkout instead of fetching only the most recent commit. The history is not merely backup. It is build input.

## What GitHub Actions Does

The [deployment workflow](https://github.com/Obscuretone/obscuretone.github.io/blob/main/.github/workflows/nextjs.yml "software, github, automation | Site deployment workflow") runs on every push to `main`, and it can also be started manually.

Its build job:

1. checks out the repository and its history;
2. sets up Node.js 20 and restores the Next.js build cache;
3. installs the exact dependency versions recorded in the lockfile;
4. runs the production build;
5. uploads the generated `out` directory as a Pages artifact.

The deploy job waits for that build to succeed, then hands the artifact to GitHub Pages. Separating the two jobs creates a useful failure boundary. A broken Markdown file, dependency problem, or build error stops before deployment. Pages only receives an artifact that the build job completed successfully.

GitHub's own [custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages "documentation, github, automation | GitHub Pages custom workflow guide") describes the same build-artifact-deploy shape. The workflow grants read access to the repository plus the narrowly scoped `pages: write` and `id-token: write` permissions required by the deployment action.

Actions is therefore not the host. It is the temporary computer that turns the repository into something a static host can serve.

## What GitHub Pages Does

[GitHub Pages is a static-site hosting service](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages "documentation, github, hosting | What GitHub Pages is"). It serves the generated HTML, CSS, JavaScript, fonts, images, and other files in the deployed artifact.

It does not run `npm`, parse Markdown on each request, or keep a Node.js process alive. By the time a visitor asks for an article, the expensive part is over. The page already exists as generated output.

This model has a sharp constraint: anything that requires request-time server code does not belong in the Pages deployment. There is no application server for private sessions, database queries, API routes, or server-side rendering. Interactive behavior can run in the browser, and external services can still be called from the browser when appropriate, but the host itself serves static files.

For a writing site, that constraint is mostly an advantage. There is little production machinery to operate, a very small attack surface, and a public artifact that can be rebuilt from the repository.

## Where The Domain Fits

The repository name gives the project its default GitHub Pages identity, while `obscuretone.com` is configured as the custom domain. DNS points the domain toward GitHub Pages, and the Pages settings associate that domain with this site.

The repository also contains a `CNAME` file as a readable record of the intended domain. With a custom GitHub Actions publishing workflow, however, [GitHub treats the Pages setting and DNS configuration as authoritative](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site "documentation, github, hosting | GitHub Pages custom domain guide"); the checked-in `CNAME` file is not what activates the domain.

That distinction matters because hosting and naming are separate systems. The deployment publishes a collection of files to Pages. DNS and the repository's Pages configuration decide which public name reaches them.

## Why Use The Repository As The CMS?

The approach fits how I already work.

1. **The IDE is a capable editor.** It already has Markdown preview, spelling support, search, completion, and multiple-file editing.
2. **Git makes revision visible.** A sentence can be compared, reverted, reviewed, or traced to a commit.
3. **The build is reproducible.** The workflow starts from the repository and lockfile instead of depending on the state of my laptop.
4. **Publication is inspectable.** A failed deployment has a build log, and a successful deployment points back to a specific revision.
5. **The content stays portable.** The essays remain Markdown files instead of records trapped behind a vendor's editor and export feature.
6. **Code and content can evolve together.** A post can add a presentation feature, metadata rule, or visualization in the same change that needs it.

It is not universally better than a hosted CMS. There is no friendly editorial form for a nontechnical author, no server-side draft system, and no database-backed publishing workflow. Collaboration happens through Git rather than through an editorial dashboard.

Those are real tradeoffs. They are simply the right ones for a personal site maintained from an IDE.

## The Site Is Evidence Of The Workflow

The pleasingly recursive part is that this article follows the system it describes.

It is a Markdown file written beside the site's code. Next.js will discover it during the build. Git will record when it appeared and how it changes. A push will ask Actions to reproduce the site from a clean runner. Pages will replace the previous artifact only after the new one builds. The custom domain will continue pointing at the result.

The site is not deployed from the IDE in the sense that the editor secretly became a web server. The IDE is the control surface for a chain of small systems with clear ownership:

```text
IDE owns authoring.
Git owns revision.
Actions owns building.
Pages owns serving.
DNS owns naming.
```

That separation is what makes the whole thing feel like one publish button.
