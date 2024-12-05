import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Server-side: Read markdown files
import fs from 'fs';
import path from 'path';

// Fetch all posts for generating paths
export async function getStaticPaths() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    const paths = filenames.map((filename) => ({
        params: { slug: filename.replace(/\.md$/, '') },
    }));

    return {
        paths,
        fallback: false, // 404 if page is not found
    };
}

// Fetch a single post's data
export async function getStaticProps({ params }) {
    const { slug } = params;

    // Read the markdown file for the requested post
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content);
    const htmlContent = processedContent.toString();

    // Get all posts for the footer
    const filenames = fs.readdirSync(postsDirectory);
    const allPosts = filenames.map((filename) => ({
        slug: filename.replace(/\.md$/, ''),
        title: matter(fs.readFileSync(path.join(postsDirectory, filename), 'utf8')).data.title || 'Untitled',
    }));

    return {
        props: {
            post: {
                title: data.title || 'Untitled',
                description: data.description || '',
                image: data.image || null,
                imagealt: data.imagealt || '',
                htmlContent,
            },
            allPosts,
        },
    };
}

// React Component: Render the post
export default function Post({ post, allPosts }) {
    const { title, description, image, imagealt, htmlContent } = post;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hljs = require('highlight.js');
            hljs.highlightAll();
        }
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                {image && <meta property="og:image" content={image} />}
                {imagealt && <meta property="og:image:alt" content={imagealt} />}
                <meta property="og:type" content="article" />
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/default.min.css" />
                <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
            </Head>

            <article>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </article>

            <footer>
                <h2>Other Posts</h2>
                <ul>
                    {allPosts.map(({ slug, title }) => (
                        <li key={slug}>
                            <Link href={`/posts/${slug}`}>{title}</Link>
                        </li>
                    ))}
                </ul>
            </footer>
        </>
    );
}