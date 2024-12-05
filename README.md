# obscuretone.github.io

Personal website and blog built with Next.js and exported as a static site for GitHub Pages.

## Development

```bash
npm install
npm run dev
```

The local site runs at <http://localhost:3000>.

## Useful Scripts

```bash
npm run lint
npm run build
```

`npm run build` creates the static export in `out/` because `next.config.js` sets `output: 'export'`.

## Content

Posts live in `public/posts/en` and `public/posts/fr` as Markdown files with front matter:

```md
---
title: Post title
description: Short description for metadata
---
```

Images used by posts live in `public/images`.
