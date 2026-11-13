# Scheduled articles

English article sources stay here until their explicit `published` timestamp is due. They are outside `public/` so neither raw Markdown nor post routes enter the exported website early. The repository itself is public; this queue is not a confidentiality boundary.

`npm run build` runs the materializer before Next.js. The Pages workflow also runs daily at 14:17 UTC, with normal GitHub Actions queue delays. For the November 2026 series this is 09:17 in Toronto. Manual and push builds use the same real-clock gate. New queue entries need an explicit timezone in both `published` and `sourcesCheckedAt`; publication must not precede the evidence check.

The November 13–25 series contains thirteen articles, one per day. Their public sources were checked on November 12 Toronto time. The Saaslio desktop-binary investigation is held outside this repository until the central finding has an independently acquired artifact. Social replies are not part of website publication.

Run `npm run test:schedule`, `npm run lint` and `npm run build` before deploying. Generated due files in `public/posts/en` are ignored by Git. Do not commit those generated copies or bypass `npm run build` with a direct Next build for publication.
