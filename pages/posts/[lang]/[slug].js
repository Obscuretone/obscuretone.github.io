import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import Link from 'next/link';
import PostsList from '../../../components/PostsList';

// Utility function to extract metadata from posts
function getPostsMetadata(postsDirectory, lang) {
    const filenames = fs.readdirSync(postsDirectory);

    return filenames
        .filter((filename) => filename.endsWith('.md'))
        .map((filename) => {
            const filePath = path.join(postsDirectory, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContents);

            return {
                slug: `${lang}/${filename.replace('.md', '')}`,
                ...data,
            };
        });
}

export async function getStaticPaths() {
    const paths = [];

    // Generate paths for English and French posts
    ['en', 'fr'].forEach((lang) => {
        const postsDirectory = path.join(process.cwd(), `public/posts/${lang}`);
        const filenames = fs.readdirSync(postsDirectory);

        filenames.forEach((filename) => {
            paths.push({
                params: { slug: filename.replace('.md', ''), lang },
            });
        });
    });

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const { slug, lang } = params;

    const postsDirectoryEn = path.join(process.cwd(), 'public/posts/en');
    const postsDirectoryFr = path.join(process.cwd(), 'public/posts/fr');

    const postsEn = getPostsMetadata(postsDirectoryEn, 'en');
    const postsFr = getPostsMetadata(postsDirectoryFr, 'fr');

    const currentDirectory = lang === 'en' ? postsDirectoryEn : postsDirectoryFr;
    const filePath = path.join(currentDirectory, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const stats = fs.statSync(filePath);
    const updatedAt = stats.mtime;

    const processedContent = await remark()
        .use(html)
        .process(content);
    const htmlContent = processedContent.toString();

    return {
        props: {
            post: {
                title: data.title || 'Untitled',
                description: data.description || '',
                htmlContent,
                updatedAt: updatedAt.toISOString(),
            },
            postsEn,
            postsFr,
            currentLang: lang,
        },
    };
}

export default function Post({ post, postsEn, postsFr, currentLang }) {
    const { title, description, htmlContent, updatedAt } = post;

    useEffect(() => {
        document.documentElement.lang = currentLang;

        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }, [htmlContent, currentLang]);

    const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString(currentLang, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : null;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>

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
                {formattedDate && (
                    <p>
                        <strong>{currentLang === 'fr' ? 'Dernière mise à jour :' : 'Last updated:'}</strong> {formattedDate}
                    </p>
                )}
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </article>

            <hr />

            <footer>
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