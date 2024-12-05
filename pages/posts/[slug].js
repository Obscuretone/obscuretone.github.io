import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function getStaticPaths() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    const paths = filenames.map((filename) => ({
        params: { slug: filename.replace(/\.md$/, '') },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const { slug } = params;
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const processedContent = await remark().use(html).process(content);
    const htmlContent = processedContent.toString();

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
                htmlContent,
            },
            allPosts,
        },
    };
}

export default function Post({ post, allPosts }) {
    const { title, description, htmlContent } = post;

    useEffect(() => {
        if (typeof window !== 'undefined' && window.MathJax) {
            window.MathJax.typesetPromise && window.MathJax.typesetPromise();
        }
    }, [htmlContent]);

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