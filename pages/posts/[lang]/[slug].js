import { useEffect, useMemo, useRef } from 'react';
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
import CutoutTitle from '../../../components/CutoutTitle';
import GraphErrorBoundary from '../../../components/GraphErrorBoundary';
import PostsList from '../../../components/PostsList';
import PostsGraph from '../../../components/PostsGraph';
import { getPostsByLanguage } from '../../../utils/posts';
import { getCurrentRevision } from '../../../utils/revision';

const MATHJAX_SCRIPT_ID = 'mathjax-script';
const SOURCE_KIND_ALIASES = {
    archive: 'archive',
    archived: 'archive',
    code: 'code',
    data: 'data',
    dataset: 'data',
    docs: 'docs',
    documentation: 'docs',
    government: 'official',
    gov: 'official',
    law: 'law',
    legal: 'law',
    manual: 'docs',
    news: 'news',
    official: 'official',
    paper: 'research',
    reference: 'reference',
    report: 'research',
    research: 'research',
    source: 'reference',
    study: 'research',
};
const SOURCE_KIND_TAGS = {
    archive: ['institutions'],
    code: ['software'],
    data: ['evidence'],
    docs: ['software'],
    law: ['government', 'institutions'],
    news: ['institutions'],
    official: ['government', 'institutions'],
    reference: ['evidence'],
    research: ['evidence'],
};

function splitAfterFirstParagraph(htmlContent) {
    const firstParagraphEnd = htmlContent.indexOf('</p>');

    if (firstParagraphEnd === -1) {
        return [htmlContent, ''];
    }

    const splitIndex = firstParagraphEnd + '</p>'.length;

    return [
        htmlContent.slice(0, splitIndex),
        htmlContent.slice(splitIndex),
    ];
}

function decodeBasicEntities(value) {
    return value
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
}

function escapeAttribute(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function cleanHtmlText(value) {
    return decodeBasicEntities(value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());
}

function getHtmlAttribute(attributes, name) {
    const match = attributes.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`, 'i'));

    return match ? decodeBasicEntities(match[1]) : '';
}

function setHtmlAttribute(attributes, name, value) {
    const escapedValue = escapeAttribute(value);
    const attributePattern = new RegExp(`(^|\\s)${name}="[^"]*"`, 'i');

    if (attributePattern.test(attributes)) {
        return attributes.replace(attributePattern, `$1${name}="${escapedValue}"`);
    }

    return `${attributes} ${name}="${escapedValue}"`;
}

function removeHtmlAttribute(attributes, name) {
    return attributes.replace(new RegExp(`(^|\\s)${name}="[^"]*"`, 'gi'), '$1').trim();
}

function slugifyHeading(value) {
    return value
        .toLowerCase()
        .replace(/&amp;/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function normalizeTag(value) {
    return slugifyHeading(value.trim());
}

function getUniqueTags(tags = []) {
    return [...new Set(tags.map(normalizeTag).filter(Boolean))];
}

function addHeadingIds(htmlContent) {
    const usedIds = new Map();

    return htmlContent.replace(/<h([2-3])>(.*?)<\/h\1>/gs, (match, level, innerHtml) => {
        const label = cleanHtmlText(innerHtml);
        const baseId = slugifyHeading(label) || `section-${usedIds.size + 1}`;
        const count = usedIds.get(baseId) || 0;
        const id = count ? `${baseId}-${count + 1}` : baseId;

        usedIds.set(baseId, count + 1);

        return `<h${level} id="${id}">${innerHtml}</h${level}>`;
    });
}

function extractSectionLinks(htmlContent) {
    return [...htmlContent.matchAll(/<h([2-3]) id="([^"]+)">(.*?)<\/h\1>/gs)]
        .map((match) => ({
            id: match[2],
            href: `#${match[2]}`,
            label: cleanHtmlText(match[3]),
        }))
        .filter((link) => link.label.length >= 3)
        .slice(0, 7);
}

function getFaviconUrl(href) {
    try {
        const url = new URL(href);

        return `${url.origin}/favicon.ico`;
    } catch {
        return '';
    }
}

function getSourceName(hostname) {
    const host = hostname.replace(/^www\./, '');
    const sourceNames = [
        ['laws-lois.justice.gc.ca', 'Justice Laws'],
        ['canada.ca', 'Canada'],
        ['gc.ca', 'Canada'],
        ['ourcommons.ca', 'House of Commons'],
        ['sencanada.ca', 'Senate'],
        ['elections.ca', 'Elections Canada'],
        ['statcan.gc.ca', 'StatCan'],
        ['bls.gov', 'BLS'],
        ['nist.gov', 'NIST'],
        ['oecd.org', 'OECD'],
        ['eeoc.gov', 'EEOC'],
        ['chrc-ccdp.gc.ca', 'CHRC'],
        ['nps.gov', 'NPS'],
        ['hbs.edu', 'Harvard'],
        ['nber.org', 'NBER'],
        ['stanford.edu', 'Stanford'],
        ['metr.org', 'METR'],
        ['journals.sagepub.com', 'SAGE'],
        ['northwestern.edu', 'Northwestern'],
        ['gbdev.io', 'GBDev'],
        ['problemkaputt.de', 'Pan Docs'],
        ['man7.org', 'man7'],
        ['numpy.org', 'NumPy'],
        ['geopandas.org', 'GeoPandas'],
        ['huggingface.co', 'Hugging Face'],
        ['github.com', 'GitHub'],
        ['cbc.ca', 'CBC'],
        ['globalnews.ca', 'Global'],
        ['nationalobserver.com', 'NatObserver'],
        ['nbmediacoop.org', 'NB Media Co-op'],
        ['wikipedia.org', 'Wikipedia'],
        ['web.archive.org', 'Archive'],
    ];
    const match = sourceNames.find(([domain]) => host === domain || host.endsWith(`.${domain}`));

    if (match) {
        return match[1];
    }

    return host
        .split('.')
        .filter((part) => !['com', 'org', 'net', 'ca', 'edu', 'gov', 'io'].includes(part))
        .slice(-2)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ') || host;
}

function getSourceTag(href) {
    try {
        const url = new URL(href);
        const host = url.hostname.replace(/^www\./, '');
        const pathName = url.pathname.toLowerCase();

        if (
            host.includes('laws-lois.justice.gc.ca')
            || host.includes('artificialintelligenceact.eu')
            || host.includes('eeoc.gov')
            || host.includes('chrc-ccdp.gc.ca')
        ) {
            return { key: 'law', label: 'law' };
        }

        if (
            host.endsWith('.gov')
            || host.endsWith('.gc.ca')
            || host.includes('canada.ca')
            || host.includes('ourcommons.ca')
            || host.includes('sencanada.ca')
            || host.includes('elections.ca')
            || host.includes('nps.gov')
        ) {
            return { key: 'official', label: 'official' };
        }

        if (
            host.includes('hbs.edu')
            || host.includes('nber.org')
            || host.includes('stanford.edu')
            || host.includes('metr.org')
            || host.includes('journals.')
            || host.includes('northwestern.edu')
            || host.includes('unibocconi.eu')
            || pathName.endsWith('.pdf')
        ) {
            return { key: 'research', label: 'research' };
        }

        if (
            host.includes('statcan.gc.ca')
            || host.includes('bls.gov')
            || host.includes('cmhc-schl.gc.ca')
            || host.includes('opendata')
        ) {
            return { key: 'data', label: 'data' };
        }

        if (
            host.includes('man7.org')
            || host.includes('gbdev.io')
            || host.includes('problemkaputt.de')
            || host.includes('numpy.org')
            || host.includes('geopandas.org')
            || host.includes('huggingface.co')
            || host.includes('developer.')
            || host.includes('docs.')
        ) {
            return { key: 'docs', label: 'docs' };
        }

        if (host.includes('github.com')) {
            return { key: 'code', label: 'code' };
        }

        if (host.includes('web.archive.org')) {
            return { key: 'archive', label: 'archive' };
        }

        if (
            host.includes('cbc.ca')
            || host.includes('globalnews.ca')
            || host.includes('nationalobserver.com')
            || host.includes('thecoast.ca')
            || host.includes('restofworld.org')
            || host.includes('thenextweb.com')
        ) {
            return { key: 'news', label: 'news' };
        }

        return { key: 'reference', label: 'reference' };
    } catch {
        return { key: 'reference', label: 'reference' };
    }
}

function normalizeSourceKind(value) {
    return SOURCE_KIND_ALIASES[value.trim().toLowerCase()] || '';
}

function labelSourceKind(kind) {
    return kind || 'reference';
}

function parseSourceTitle(title, inferredMeta) {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
        return {
            meta: inferredMeta,
            consumesTitle: false,
        };
    }

    const sourceSyntaxMatch = cleanTitle.match(/^(?:source|tag|kind|type)\s*:\s*(.+)$/i);
    const body = sourceSyntaxMatch ? sourceSyntaxMatch[1] : cleanTitle;
    const parts = body.split(/[|;]/).map((part) => part.trim()).filter(Boolean);
    const tagText = parts[0]?.replace(/^(?:source|tag|kind|type)\s*:\s*/i, '') || '';
    const parsedTags = getUniqueTags(tagText.split(/[,#]/));
    const sourceKind = parsedTags.map(normalizeSourceKind).find(Boolean) || inferredMeta.sourceKind;

    if (!parsedTags.length && !normalizeSourceKind(tagText)) {
        return {
            meta: inferredMeta,
            consumesTitle: false,
        };
    }

    const sourceName = parts
        .slice(1)
        .map((part) => part.replace(/^name\s*:\s*/i, '').trim())
        .find(Boolean);

    return {
        meta: {
            ...inferredMeta,
            sourceKind,
            sourceTag: parsedTags[0] || labelSourceKind(sourceKind),
            sourceTags: parsedTags.length ? parsedTags : inferredMeta.sourceTags,
            sourceName: sourceName || inferredMeta.sourceName,
        },
        consumesTitle: true,
    };
}

function getSourceMeta(href, title = '', postTags = []) {
    try {
        const url = new URL(href);
        const tag = getSourceTag(href);
        const inferredTags = getUniqueTags([
            ...postTags,
            ...(SOURCE_KIND_TAGS[tag.key] || SOURCE_KIND_TAGS.reference),
        ]);
        const inferredMeta = {
            sourceName: getSourceName(url.hostname),
            sourceKind: tag.key,
            sourceTag: inferredTags[0] || tag.label,
            sourceTags: inferredTags,
        };

        return parseSourceTitle(title, inferredMeta);
    } catch {
        return {
            meta: {
                sourceName: 'Source',
                sourceTag: 'reference',
                sourceKind: 'reference',
                sourceTags: getUniqueTags([...postTags, 'evidence']),
            },
            consumesTitle: false,
        };
    }
}

function annotateExternalLinks(htmlContent, postTags = []) {
    return htmlContent.replace(/<a\s+([^>]*href="([^"]+)"[^>]*)>(.*?)<\/a>/gs, (match, attributes, hrefValue, innerHtml) => {
        const href = decodeBasicEntities(hrefValue);

        if (!/^https?:\/\//.test(href)) {
            return match;
        }

        const title = getHtmlAttribute(attributes, 'title');
        const { meta, consumesTitle } = getSourceMeta(href, title, postTags);
        let nextAttributes = attributes;
        const existingClass = getHtmlAttribute(nextAttributes, 'class');
        const linkClasses = [
            existingClass,
            'article-source-link',
            `article-source-link--${meta.sourceKind}`,
        ].filter(Boolean).join(' ');

        nextAttributes = setHtmlAttribute(nextAttributes, 'class', linkClasses);
        nextAttributes = setHtmlAttribute(nextAttributes, 'data-source-kind', meta.sourceKind);
        nextAttributes = setHtmlAttribute(nextAttributes, 'data-source-tag', meta.sourceTag);
        nextAttributes = setHtmlAttribute(nextAttributes, 'data-source-tags', meta.sourceTags.join(','));
        nextAttributes = setHtmlAttribute(nextAttributes, 'data-source-name', meta.sourceName);

        if (consumesTitle) {
            nextAttributes = removeHtmlAttribute(nextAttributes, 'title');
        }

        return `<a ${nextAttributes}>${innerHtml}</a>`;
    });
}

function extractSourceLinks(htmlContent) {
    const tokenPattern = /<h([2-3]) id="([^"]+)">(.*?)<\/h\1>|<a\s+([^>]*href="([^"]+)"[^>]*)>(.*?)<\/a>/gs;
    const links = [];
    let currentSection = null;

    [...htmlContent.matchAll(tokenPattern)].forEach((match) => {
        if (match[2]) {
            currentSection = {
                id: match[2],
                label: cleanHtmlText(match[3]),
            };
            return;
        }

        const attributes = match[4];
        const href = decodeBasicEntities(match[5]);

        if (!/^https?:\/\//.test(href)) {
            return;
        }

        const label = cleanHtmlText(match[6]) || href;
        const title = getHtmlAttribute(attributes, 'title');
        const sourceMeta = {
            sourceKind: getHtmlAttribute(attributes, 'data-source-kind'),
            sourceName: getHtmlAttribute(attributes, 'data-source-name'),
            sourceTag: getHtmlAttribute(attributes, 'data-source-tag'),
            sourceTags: getUniqueTags(getHtmlAttribute(attributes, 'data-source-tags').split(',')),
        };
        const fallbackMeta = getSourceMeta(href, title).meta;

        links.push({
            href,
            label,
            favicon: getFaviconUrl(href),
            sourceKind: sourceMeta.sourceKind || fallbackMeta.sourceKind,
            sourceName: sourceMeta.sourceName || fallbackMeta.sourceName,
            sourceTag: sourceMeta.sourceTag || fallbackMeta.sourceTag,
            tags: sourceMeta.sourceTags.length ? sourceMeta.sourceTags : fallbackMeta.sourceTags,
            sectionId: currentSection?.id || '',
            sectionLabel: currentSection?.label || '',
        });
    });

    const seen = new Set();

    return links
        .filter((link) => link.label.length >= 2 && link.label.length <= 80)
        .filter((link) => {
            const key = `${link.href}:${link.label}`.toLowerCase();

            if (seen.has(key)) {
                return false;
            }

            seen.add(key);
            return true;
        })
        .slice(0, 4);
}

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
    const postTags = data.tags || [];
    const htmlContent = annotateExternalLinks(addHeadingIds(processedContent.toString()), postTags);

    return {
        props: {
            post: {
                slug: `${lang}/${slug}`,
                title: data.title || 'Untitled',
                description: data.description || '',
                tags: data.tags || [],
                image: data.image || '',
                imageAlt: data.imagealt || '',
                imageCaption: data.imagecaption || '',
                imageSource: data.imagesource || '',
                imageSourceUrl: data.imagesourceurl || '',
                htmlContent,
                updatedAt,
            },
            postsEn,
            currentLang: lang,
            revision: getCurrentRevision(),
        },
    };
}

export default function Post({ post, postsEn, currentLang, revision }) {
    const {
        title,
        description,
        htmlContent,
        updatedAt,
    } = post;
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
    const [openingHtml, remainingHtml] = splitAfterFirstParagraph(htmlContent);
    const evidenceItems = useMemo(() => ({
        sectionLinks: extractSectionLinks(htmlContent),
        sourceLinks: extractSourceLinks(htmlContent),
    }), [htmlContent]);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>

            <header data-revision={revision}>
                <h1>obscuretone</h1>
                <h2>Systems, software, and stray signal</h2>
            </header>

            <hr />

            <article>
                <CutoutTitle title={title} seedText={htmlContent} />
                {formattedDate && (
                    <p>
                        <strong>Last updated:</strong> {formattedDate}
                    </p>
                )}
                <div ref={articleContentRef}>
                    <div dangerouslySetInnerHTML={{ __html: openingHtml }} />
                    <GraphErrorBoundary>
                        <PostsGraph posts={postsEn} currentSlug={post.slug} evidenceItems={evidenceItems} />
                    </GraphErrorBoundary>
                    <div dangerouslySetInnerHTML={{ __html: remainingHtml }} />
                </div>
            </article>

            <hr />

            <footer>
                <PostsList title="All Articles" posts={postsEn} />
            </footer>
        </>
    );
}
