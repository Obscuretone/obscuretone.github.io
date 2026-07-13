import { useEffect, useRef } from 'react';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import PostsList from '../../../components/PostsList';
import NearbyArguments from '../../../components/NearbyArguments';
import { getNearbyArguments } from '../../../utils/nearbyArguments';
import { getPostsByLanguage } from '../../../utils/posts';

const MATHJAX_SCRIPT_ID = 'mathjax-script';

function ensureMathJax() {
    if (typeof window === 'undefined') {
        return Promise.resolve(null);
    }

    if (window.MathJax?.typesetPromise) {
        return Promise.resolve(window.MathJax);
    }

    if (window.__mathJaxLoadingPromise) {
        return window.__mathJaxLoadingPromise;
    }

    window.MathJax = {
        startup: {
            typeset: false,
        },
        tex: {
            inlineMath: [['$', '$']],
            displayMath: [['$$', '$$']],
        },
        svg: { fontCache: 'global' },
    };

    window.__mathJaxLoadingPromise = new Promise((resolve, reject) => {
        const existingScript = document.getElementById(MATHJAX_SCRIPT_ID);

        if (existingScript) {
            existingScript.addEventListener('load', () => resolve(window.MathJax), { once: true });
            existingScript.addEventListener('error', reject, { once: true });
            return;
        }

        const script = document.createElement('script');
        script.id = MATHJAX_SCRIPT_ID;
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js';
        script.async = true;
        script.onload = () => resolve(window.MathJax);
        script.onerror = reject;
        document.head.appendChild(script);
    });

    return window.__mathJaxLoadingPromise;
}

function getGitLastUpdated(filePath) {
    try {
        const relativePath = path.relative(process.cwd(), filePath);
        const updatedAt = execFileSync(
            'git',
            ['log', '-1', '--format=%aI', '--', relativePath],
            { cwd: process.cwd(), encoding: 'utf8' },
        ).trim();

        return updatedAt || null;
    } catch {
        return null;
    }
}

export async function getStaticPaths() {
    const paths = [];

    // Generate paths for published English posts
    ['en'].forEach((lang) => {
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

    const postsEn = getPostsByLanguage('en');

    const currentDirectory = postsDirectoryEn;
    const filePath = path.join(currentDirectory, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const updatedAt = getGitLastUpdated(filePath) || fs.statSync(filePath).mtime.toISOString();

    const processedContent = await remark()
        .use(remarkGfm)
        .use(html)
        .process(content);
    const htmlContent = processedContent.toString();

    return {
        props: {
            post: {
                slug: `${lang}/${slug}`,
                title: data.title || 'Untitled',
                description: data.description || '',
                tags: data.tags || [],
                htmlContent,
                updatedAt,
            },
            nearbyArguments: getNearbyArguments({
                slug: `${lang}/${slug}`,
                tags: data.tags || [],
            }, postsEn),
            postsEn,
            currentLang: lang,
        },
    };
}

export default function Post({ post, nearbyArguments, postsEn, currentLang }) {
    const { title, description, htmlContent, updatedAt } = post;
    const articleContentRef = useRef(null);

    useEffect(() => {
        document.documentElement.lang = currentLang;

        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });

        let isCancelled = false;

        ensureMathJax()
            .then((mathJax) => {
                if (isCancelled || !mathJax?.typesetPromise || !articleContentRef.current) {
                    return;
                }

                mathJax.typesetClear?.([articleContentRef.current]);
                return mathJax.typesetPromise([articleContentRef.current]);
            })
            .catch((error) => {
                console.error('MathJax failed to render', error);
            });

        return () => {
            isCancelled = true;
        };
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

            <header>
                <h1>obscuretone</h1>
                <h2>Systems, software, and stray signal</h2>
            </header>

            <hr />

            <article>
                <h1>{title}</h1>
                {formattedDate && (
                    <p>
                        <strong>Last updated:</strong> {formattedDate}
                    </p>
                )}
                <div ref={articleContentRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </article>

            <hr />

            <NearbyArguments posts={nearbyArguments} />

            <hr />

            <footer>
                <PostsList title="Other Posts" posts={postsEn} />
            </footer>
        </>
    );
}
