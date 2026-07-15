import { useEffect, useMemo, useRef, useState } from 'react';
import {
    forceCenter,
    forceCollide,
    forceLink,
    forceManyBody,
    forceRadial,
    forceSimulation,
    forceX,
    forceY,
} from 'd3-force';

const GRAPH_HEIGHT = 420;
const ARTICLE_NODE_WIDTH = 124;
const ARTICLE_NODE_HEIGHT = 78;
const SECTION_LINK_NODE_WIDTH = 126;
const SECTION_LINK_NODE_HEIGHT = 76;
const SOURCE_LINK_NODE_WIDTH = 142;
const SOURCE_LINK_NODE_HEIGHT = 86;
const PADDING = 14;
const MAX_NEIGHBORS = 5;

function getNodeDimensions(node) {
    if (node.type === 'section-link') {
        return { width: SECTION_LINK_NODE_WIDTH, height: SECTION_LINK_NODE_HEIGHT };
    }

    if (node.type === 'source-link') {
        return { width: SOURCE_LINK_NODE_WIDTH, height: SOURCE_LINK_NODE_HEIGHT };
    }

    return { width: ARTICLE_NODE_WIDTH, height: ARTICLE_NODE_HEIGHT };
}

function getSharedTags(left = [], right = []) {
    const rightTags = new Set(right);

    return left.filter((tag) => rightTags.has(tag));
}

function getTagCounts(posts) {
    const counts = new Map();

    posts.forEach((post) => {
        (post.tags || []).forEach((tag) => {
            counts.set(tag, (counts.get(tag) || 0) + 1);
        });
    });

    return counts;
}

function getLinkScore(sharedTags, tagCounts) {
    return sharedTags.reduce((score, tag) => (
        score + 1 + (1 / (tagCounts.get(tag) || 1))
    ), 0);
}

function getNeighborhood(posts, currentSlug, tagCounts) {
    const currentPost = posts.find((post) => post.slug === currentSlug);

    if (!currentPost) {
        return posts.slice(0, MAX_NEIGHBORS + 1);
    }

    const neighbors = posts
        .filter((post) => post.slug !== currentSlug)
        .map((post) => {
            const sharedTags = getSharedTags(currentPost.tags || [], post.tags || []);

            return {
                ...post,
                sharedTags,
                graphScore: getLinkScore(sharedTags, tagCounts),
            };
        })
        .filter((post) => post.sharedTags.length > 0)
        .sort((left, right) => (
            right.graphScore - left.graphScore
            || right.sharedTags.length - left.sharedTags.length
            || left.title.localeCompare(right.title)
        ))
        .slice(0, MAX_NEIGHBORS);

    return [currentPost, ...neighbors];
}

function buildGraph(posts, currentSlug, evidenceItems = {}) {
    const tagCounts = getTagCounts(posts);
    const neighborhood = getNeighborhood(posts, currentSlug, tagCounts);
    const nodeIds = new Set(neighborhood.map((post) => post.slug));
    const articleNodes = neighborhood.map((post) => ({
        id: post.slug,
        title: post.title || post.slug,
        href: `/posts/${post.slug}`,
        tags: post.tags || [],
        isCurrent: post.slug === currentSlug,
        type: 'article',
    }));
    const currentNode = articleNodes.find((node) => node.isCurrent);
    const sectionNodes = (evidenceItems.sectionLinks || []).map((link, index) => ({
        id: `${currentSlug}:section:${link.id || index}`,
        sectionId: link.id || '',
        title: link.label,
        href: link.href,
        type: 'section-link',
    }));
    const sectionNodeIds = new Map(sectionNodes.map((node) => [node.sectionId, node.id]));
    const sourceNodes = (evidenceItems.sourceLinks || []).map((link, index) => ({
        id: `${currentSlug}:source:${index}`,
        sectionNodeId: sectionNodeIds.get(link.sectionId) || '',
        title: link.label,
        href: link.href,
        favicon: link.favicon,
        tags: link.tags || [],
        sourceKind: link.sourceKind || 'reference',
        sourceName: link.sourceName || 'Source',
        sourceTag: link.sourceTag || (link.tags || [])[0] || 'reference',
        type: 'source-link',
    }));
    const evidenceNodes = [...sectionNodes, ...sourceNodes];
    const nodes = [...articleNodes, ...evidenceNodes];
    const taggedNodes = nodes.filter((node) => ['article', 'source-link'].includes(node.type));
    const candidates = [];

    for (let leftIndex = 0; leftIndex < taggedNodes.length; leftIndex += 1) {
        for (let rightIndex = leftIndex + 1; rightIndex < taggedNodes.length; rightIndex += 1) {
            const source = taggedNodes[leftIndex];
            const target = taggedNodes[rightIndex];
            const sharedTags = getSharedTags(source.tags, target.tags);

            if (!sharedTags.length) {
                continue;
            }

            candidates.push({
                source: source.id,
                target: target.id,
                sharedTags,
                score: getLinkScore(sharedTags, tagCounts),
            });
        }
    }

    const selectedLinks = new Map();

    candidates
        .sort((left, right) => right.score - left.score)
        .forEach((link) => {
            if (currentNode && (link.source === currentNode.id || link.target === currentNode.id)) {
                selectedLinks.set([link.source, link.target].sort().join('|'), link);
            }
        });

    candidates
        .filter((link) => (
            (nodeIds.has(link.source) || link.source.includes(':source:'))
            && (nodeIds.has(link.target) || link.target.includes(':source:'))
        ))
        .sort((left, right) => right.score - left.score)
        .slice(0, Math.max(9, Math.floor(nodes.length * 1.35)))
        .forEach((link) => {
            selectedLinks.set([link.source, link.target].sort().join('|'), link);
        });

    sectionNodes.forEach((node, index) => {
        if (!currentNode) {
            return;
        }

        selectedLinks.set(`${currentNode.id}|${node.id}`, {
            source: currentNode.id,
            target: node.id,
            score: 2.7 + (index % 3) * 0.35,
        });
    });

    sourceNodes.forEach((node, index) => {
        if (!node.sectionNodeId) {
            return;
        }

        selectedLinks.set(`${node.sectionNodeId}|${node.id}`, {
            source: node.sectionNodeId,
            target: node.id,
            score: 3.6 + (index % 3) * 0.25,
        });
    });

    return {
        nodes,
        links: [...selectedLinks.values()],
    };
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function clampNode(node, width, height) {
    const dimensions = getNodeDimensions(node);
    const halfWidth = dimensions.width / 2;
    const halfHeight = dimensions.height / 2;

    node.x = clamp(node.x, PADDING + halfWidth, width - PADDING - halfWidth);
    node.y = clamp(node.y, PADDING + halfHeight, height - PADDING - halfHeight);
}

function drawGraph(canvas, graph, width, height) {
    if (!canvas) {
        return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
        return;
    }

    const ratio = window.devicePixelRatio || 1;

    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);

    graph.links.forEach((link) => {
        const strength = Math.min(1, link.score / 4);

        context.beginPath();
        context.moveTo(link.source.x, link.source.y);
        context.lineTo(link.target.x, link.target.y);
        context.strokeStyle = `rgba(163, 22, 33, ${0.34 + strength * 0.48})`;
        context.lineWidth = 1.2 + strength * 2.4;
        context.stroke();
    });

    graph.links.forEach((link) => {
        const sourceAngle = Math.atan2(link.target.y - link.source.y, link.target.x - link.source.x);
        const targetAngle = sourceAngle + Math.PI;

        [link.source, link.target].forEach((node, index) => {
            const angle = index === 0 ? sourceAngle : targetAngle;
            const dimensions = getNodeDimensions(node);
            const x = node.x + Math.cos(angle) * ((dimensions.width / 2) - 8);
            const y = node.y + Math.sin(angle) * ((dimensions.height / 2) - 5);

            context.beginPath();
            context.arc(x, y, 1.8, 0, Math.PI * 2);
            context.fillStyle = node.isCurrent ? '#4e8098' : '#a31621';
            context.fill();
        });
    });
}

export default function PostsGraph({ posts, currentSlug, evidenceItems }) {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const simulationRef = useRef(null);
    const dragRef = useRef({ node: null, moved: false, startX: 0, startY: 0 });
    const frameRef = useRef(null);
    const [size, setSize] = useState({ width: 0, height: GRAPH_HEIGHT });
    const [nodes, setNodes] = useState([]);
    const graph = useMemo(
        () => buildGraph(posts, currentSlug, evidenceItems),
        [posts, currentSlug, evidenceItems],
    );

    useEffect(() => {
        if (!containerRef.current) {
            return undefined;
        }

        if (typeof ResizeObserver === 'undefined') {
            const rect = containerRef.current.getBoundingClientRect();

            setSize({
                width: Math.max(320, Math.floor(rect.width)),
                height: Math.max(320, Math.floor(rect.height || GRAPH_HEIGHT)),
            });

            return undefined;
        }

        const observer = new ResizeObserver(([entry]) => {
            const height = entry.contentRect.height || GRAPH_HEIGHT;

            setSize({
                width: Math.max(320, Math.floor(entry.contentRect.width)),
                height: Math.max(320, Math.floor(height)),
            });
        });

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!size.width || !canvasRef.current) {
            return undefined;
        }

        const nodeCopies = graph.nodes.map((node, index) => ({
            ...node,
            x: PADDING + ((index * 73) % Math.max(1, size.width - PADDING * 2)),
            y: PADDING + ((index * 47) % (size.height - PADDING * 2)),
        }));
        const links = graph.links.map((link) => ({ ...link }));
        const currentNode = nodeCopies.find((node) => node.isCurrent);

        if (currentNode) {
            currentNode.fx = size.width / 2;
            currentNode.fy = size.height / 2;
        }

        const simulation = forceSimulation(nodeCopies)
            .force('link', forceLink(links)
                .id((node) => node.id)
                .distance((link) => 96 + (1 / Math.max(link.score, 0.5)) * 42)
                .strength((link) => Math.min(0.19, 0.055 + link.score * 0.02)))
            .force('charge', forceManyBody().strength(-360))
            .force('collide', forceCollide().radius((node) => {
                const dimensions = getNodeDimensions(node);

                return Math.max(dimensions.width, dimensions.height) * 0.55;
            }).strength(1))
            .force('radial', forceRadial(
                (node) => (node.isCurrent ? 0 : Math.min(size.width, size.height) * 0.38),
                size.width / 2,
                size.height / 2,
            ).strength((node) => (node.isCurrent ? 0.12 : 0.08)))
            .force('x', forceX(size.width / 2).strength(0.026))
            .force('y', forceY(size.height / 2).strength(0.032))
            .force('center', forceCenter(size.width / 2, size.height / 2))
            .on('tick', () => {
                nodeCopies.forEach((node) => {
                    clampNode(node, size.width, size.height);
                });

                if (frameRef.current) {
                    return;
                }

                frameRef.current = requestAnimationFrame(() => {
                    frameRef.current = null;
                    drawGraph(canvasRef.current, { nodes: nodeCopies, links }, size.width, size.height);
                    setNodes([...nodeCopies]);
                });
            });

        simulationRef.current = simulation;

        return () => {
            simulation.stop();

            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
                frameRef.current = null;
            }
        };
    }, [graph, size]);

    function getNodeFromEvent(event, nodeId) {
        const node = simulationRef.current?.nodes().find((candidate) => candidate.id === nodeId);
        const rect = containerRef.current?.getBoundingClientRect();

        return {
            node,
            x: rect ? event.clientX - rect.left : 0,
            y: rect ? event.clientY - rect.top : 0,
        };
    }

    function handlePointerDown(event, nodeId) {
        const { node, x, y } = getNodeFromEvent(event, nodeId);

        if (!node || node.isCurrent) {
            return;
        }

        dragRef.current = { node, moved: false, startX: x, startY: y };
        node.fx = x;
        node.fy = y;
        simulationRef.current?.alphaTarget(0.25).restart();
        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function handlePointerMove(event) {
        const { node, startX, startY } = dragRef.current;

        if (!node) {
            return;
        }

        const rect = containerRef.current?.getBoundingClientRect();

        if (!rect) {
            return;
        }

        const nextX = event.clientX - rect.left;
        const nextY = event.clientY - rect.top;

        node.fx = clamp(
            nextX,
            PADDING + getNodeDimensions(node).width / 2,
            size.width - PADDING - getNodeDimensions(node).width / 2,
        );
        node.fy = clamp(
            nextY,
            PADDING + getNodeDimensions(node).height / 2,
            size.height - PADDING - getNodeDimensions(node).height / 2,
        );

        if (Math.hypot(nextX - startX, nextY - startY) > 4) {
            dragRef.current.moved = true;
        }
    }

    function handlePointerUp(event) {
        const { node } = dragRef.current;

        if (!node) {
            return;
        }

        node.fx = null;
        node.fy = null;
        simulationRef.current?.alphaTarget(0);
        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        dragRef.current = { ...dragRef.current, node: null };
    }

    function handleClick(event) {
        if (dragRef.current.moved) {
            event.preventDefault();
        }

        dragRef.current = { node: null, moved: false, startX: 0, startY: 0 };
    }

    function getNodeClassName(node) {
        return [
            'posts-graph__node',
            `posts-graph__node--${node.type}`,
            node.sourceKind ? `posts-graph__node--source-${node.sourceKind}` : '',
            node.isCurrent ? 'posts-graph__node--current' : '',
        ].filter(Boolean).join(' ');
    }

    function getNodeHandlers(node) {
        return {
            onPointerDown: (event) => handlePointerDown(event, node.id),
            onPointerMove: handlePointerMove,
            onPointerUp: handlePointerUp,
            onPointerCancel: handlePointerUp,
            onDragStart: (event) => event.preventDefault(),
            onClick: handleClick,
        };
    }

    function renderNode(node) {
        const style = {
            left: `${node.x}px`,
            top: `${node.y}px`,
        };

        if (node.type === 'section-link' || node.type === 'source-link') {
            return (
                <a
                    key={node.id}
                    href={node.href}
                    className={getNodeClassName(node)}
                    style={style}
                    aria-label={node.title}
                    draggable={false}
                    title={node.title}
                    {...getNodeHandlers(node)}
                >
                    {node.type === 'source-link' && node.favicon && (
                        <span
                            className="posts-graph__favicon"
                            style={{ backgroundImage: `url(${node.favicon})` }}
                            aria-hidden="true"
                        />
                    )}
                    {node.type === 'source-link' && (
                        <em className="posts-graph__source-tag">
                            <b>{node.sourceTag}</b>
                            <small>{node.sourceName}</small>
                        </em>
                    )}
                    <span>{node.title}</span>
                    {node.type === 'source-link' && (node.tags || []).length > 1 && (
                        <small className="posts-graph__source-tags">
                            {(node.tags || []).slice(1, 3).join(' / ')}
                        </small>
                    )}
                    {node.type === 'section-link' && <em>section</em>}
                </a>
            );
        }

        return (
            <a
                key={node.id}
                href={node.href}
                className={getNodeClassName(node)}
                style={style}
                aria-current={node.isCurrent ? 'page' : undefined}
                aria-label={node.title}
                draggable={false}
                title={node.title}
                {...getNodeHandlers(node)}
            >
                {node.title}
            </a>
        );
    }

    return (
        <section className="posts-graph" aria-label="Evidence board">
            <div ref={containerRef} className="posts-graph__stage">
                <canvas
                    ref={canvasRef}
                    className="posts-graph__canvas"
                    aria-hidden="true"
                />
                {nodes.map(renderNode)}
            </div>
        </section>
    );
}
