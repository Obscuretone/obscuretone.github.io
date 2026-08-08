// utils/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getGitFirstAdded, normalizeDate } from './gitDates';

export function getPostsByLanguage(language) {
    const postsDirectory = path.join(process.cwd(), `public/posts/${language}`);
    const filenames = fs.readdirSync(postsDirectory);

    return filenames
        .filter((filename) => {
            const fullPath = path.join(postsDirectory, filename);
            return fs.statSync(fullPath).isFile() && filename.endsWith('.md');
        })
        .map((filename) => {
            const filePath = path.join(postsDirectory, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContents);

            return {
                ...data,
                published: normalizeDate(data.published),
                slug: `${language}/${filename.replace('.md', '')}`,
                publishedAt: normalizeDate(data.published) || getGitFirstAdded(filePath),
            };
        })
        .sort((left, right) => {
            const leftTime = Date.parse(left.publishedAt) || 0;
            const rightTime = Date.parse(right.publishedAt) || 0;
            const byDate = rightTime - leftTime;
            return byDate || left.title.localeCompare(right.title);
        });
}
