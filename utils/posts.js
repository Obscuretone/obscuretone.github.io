// utils/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
                slug: `${language}/${filename.replace('.md', '')}`,
                ...data,
            };
        });
}