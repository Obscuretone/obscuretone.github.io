import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import matter from 'gray-matter';

const timestamp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/;

function parseTimestamp(value, field, filename) {
    if (typeof value !== 'string' || !timestamp.test(value) || !Number.isFinite(Date.parse(value))) {
        throw new Error(`${filename}: ${field} needs an ISO timestamp with a timezone`);
    }
    return Date.parse(value);
}

// Staged articles live outside public/, so future Markdown and routes are absent
// from the exported site. Run on every build, including manual deployments.
export function materializeScheduledPosts({ root = process.cwd(), now = new Date() } = {}) {
    const stagedDirectory = path.join(root, 'scheduled-posts/en');
    const publicDirectory = path.join(root, 'public/posts/en');
    const clock = now.getTime();
    if (!Number.isFinite(clock)) throw new Error('Invalid publication clock');
    if (!fs.existsSync(stagedDirectory)) return [];

    const entries = fs.readdirSync(stagedDirectory).filter((name) => name.endsWith('.md')).map((name) => {
        const content = fs.readFileSync(path.join(stagedDirectory, name), 'utf8');
        const { data } = matter(content);
        const published = parseTimestamp(data.published, 'published', name);
        const checked = parseTimestamp(data.sourcesCheckedAt, 'sourcesCheckedAt', name);
        if (checked > published) throw new Error(`${name}: publication precedes its evidence check`);
        const destination = path.join(publicDirectory, name);
        if (fs.existsSync(destination) && fs.readFileSync(destination, 'utf8') !== content) {
            throw new Error(`${name}: scheduled slug collides with an existing public post`);
        }
        return { name, content, destination, due: published <= clock };
    });

    // Validate the complete set before changing any public file.
    fs.mkdirSync(publicDirectory, { recursive: true });
    for (const entry of entries) {
        if (entry.due) fs.writeFileSync(entry.destination, entry.content);
        else if (fs.existsSync(entry.destination)) fs.unlinkSync(entry.destination);
    }
    return entries.filter((entry) => entry.due).map((entry) => entry.name);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    if (process.argv.length !== 2) throw new Error('The publication clock cannot be overridden on the CLI');
    const due = materializeScheduledPosts();
    console.log(`Materialized ${due.length} due scheduled articles`);
}
