import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Highlight.js theme for syntax highlighting
import Link from 'next/link';
import PostsList from '../../../components/PostsList'; // Import PostsList component

export async function getStaticPaths() {
    const paths = [];

    // Generate paths for English and French posts
    ['en', 'fr'].forEach((lang) => {
        const postsDirectory = path.join(process.cwd(), `posts/${lang}`);
        const filenames = fs.readdirSync(postsDirectory);

        filenames.forEach((filename) => {
            paths.push({
                params: { slug: filename.replace('.md', ''), lang }, // Include lang within params
            });
        });
    });

    return {
        paths,
        fallback: false, // No fallback since all paths are pre-generated
    };
}

export async function getStaticProps({ params }) {
    const { slug, lang } = params;

    // Define directories for each language
    const postsDirectoryEn = path.join(process.cwd(), 'posts/en');
    const postsDirectoryFr = path.join(process.cwd(), 'posts/fr');

    // Get all posts from both directories
    const filenamesEn = fs.readdirSync(postsDirectoryEn);
    const filenamesFr = fs.readdirSync(postsDirectoryFr);

    // Extract metadata for English posts
    const postsEn = filenamesEn
        .filter((filename) => filename.endsWith('.md'))
        .map((filename) => {
            const filePath = path.join(postsDirectoryEn, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContents);

            return {
                slug: `en/${filename.replace('.md', '')}`,
                ...data,
            };
        });

    // Extract metadata for French posts
    const postsFr = filenamesFr
        .filter((filename) => filename.endsWith('.md'))
        .map((filename) => {
            const filePath = path.join(postsDirectoryFr, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContents);

            return {
                slug: `fr/${filename.replace('.md', '')}`,
                ...data,
            };
        });

    // Load the current post (either English or French)
    const currentDirectory = lang === 'en' ? postsDirectoryEn : postsDirectoryFr;
    const filePath = path.join(currentDirectory, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Get the last modified date of the post file (updatedAt from file stats)
    const stats = fs.statSync(filePath); // Get file stats
    const updatedAt = stats.mtime;  // Get the last modified time of the file

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content);
    const htmlContent = processedContent.toString();

    return {
        props: {
            post: {
                title: data.title || 'Untitled',
                description: data.description || '',
                htmlContent,
                updatedAt: updatedAt.toISOString(), // Store the modified date as ISO string
            },
            postsEn,
            postsFr,
            currentLang: lang, // Pass currentLang to the page
        },
    };
}

export default function Post({ post, postsEn, postsFr, currentLang }) {
    const { title, description, htmlContent, updatedAt } = post;

    useEffect(() => {
        // Dynamically update the lang attribute based on currentLang
        document.documentElement.lang = currentLang;

        // Apply syntax highlighting for code blocks
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }, [htmlContent, currentLang]); // Re-run when content or language changes

    // Format the updatedAt date to show as "Month Day, Year" (e.g., December 14, 2024)
    const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : null;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>

            {/* MathJax Configuration */}
            <Script id="mathjax-config" strategy="afterInteractive">
                {`
                    MathJax = {
                        tex: {
                            inlineMath: [['$', '$'], ['\$begin:math:text$', '\\$end:math:text$']],
                            displayMath: [['$$', '$$'], ['\$begin:math:display$', '\\$end:math:display$']],
                        },
                        svg: { fontCache: 'global' },
                    };
                `}
            </Script>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js"
                strategy="afterInteractive"
            />

            <header>
                <h1>Evan d'Entremont</h1>
                <h2>Musings on Tech</h2>
            </header>

            <hr />

            <article>
                <h1>{title}</h1>
                <p>{description}</p>
                {formattedDate && <p><strong>Last updated:</strong> {formattedDate}</p>} {/* Display the updated date */}
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </article>

            <hr />

            <footer>
                {/* Conditional Rendering Based on Language */}
                {currentLang === 'en' ? (
                    <>
                        <PostsList title="Other Posts" posts={postsEn} />
                        <PostsList title="French Posts" posts={postsFr} />
                    </>
                ) : (
                    <>
                        <PostsList title="Autre Articles" posts={postsFr} />
                        <PostsList title="Articles en Anglais" posts={postsEn} />
                    </>
                )}
            </footer>
        </>
    );
}