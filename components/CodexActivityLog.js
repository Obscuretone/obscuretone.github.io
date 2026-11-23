import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/CodexActivityLog.module.css';

const FEED_URL = 'https://watch.codexgonewild.com/activity.json';
const PAGE_SIZE = 12;
const PROJECTS_PER_PAGE = 6;
const REFRESH_MS = 60_000;
const TIMESTAMP = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/;
const TOPIC = /^[\p{L}\p{N}][\p{L}\p{N} ’().-]{0,59}$/u;
const eastern = new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'America/Toronto',
});

function isTimestamp(value) {
    return typeof value === 'string' && TIMESTAMP.test(value) && Number.isFinite(Date.parse(value));
}

function isFeed(value) {
    return value?.version === 1 && isTimestamp(value.checkedAt) && Array.isArray(value.runs)
        && value.runs.every((run, index) => run?.number === index + 1
            && isTimestamp(run.completedAt) && Number.isInteger(run.durationSeconds)
            && run.durationSeconds >= 0 && typeof run.topic === 'string' && TOPIC.test(run.topic));
}

function duration(seconds) {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

function listProjects(runs, projectNotes) {
    const projects = new Map();
    for (const run of runs) {
        if (!Object.hasOwn(projectNotes, run.topic)) continue;
        const count = projects.get(run.topic)?.count ?? 0;
        projects.set(run.topic, { topic: run.topic, lastRun: run, count: count + 1 });
    }
    return [...projects.values()].sort((left, right) => right.lastRun.number - left.lastRun.number);
}

export default function CodexActivityLog({ snapshot, projectNotes }) {
    const [feed, setFeed] = useState(snapshot);
    const [connection, setConnection] = useState('snapshot');
    const [visibleRuns, setVisibleRuns] = useState(PAGE_SIZE);
    const [visibleProjects, setVisibleProjects] = useState(PROJECTS_PER_PAGE);
    const history = useRef(null);

    useEffect(() => {
        let closed = false;
        let scheduled;
        let request;
        let lastFeed = snapshot;

        async function refresh() {
            request = new AbortController();
            const timeout = setTimeout(() => request.abort(), 8000);
            try {
                const response = await fetch(FEED_URL, { credentials: 'omit', signal: request.signal });
                if (!response.ok) throw new Error('Activity feed unavailable');
                const next = await response.json();
                if (!isFeed(next) || next.checkedAt < lastFeed.checkedAt || next.runs.length < lastFeed.runs.length
                    || Date.now() - Date.parse(next.checkedAt) > 5 * REFRESH_MS) {
                    throw new Error('Activity feed is older than the saved log');
                }
                if (!closed) {
                    lastFeed = next;
                    setFeed(next);
                    setConnection('live');
                }
            } catch {
                if (!closed) setConnection('snapshot');
            } finally {
                clearTimeout(timeout);
                if (!closed) scheduled = setTimeout(refresh, REFRESH_MS);
            }
        }

        refresh();
        return () => {
            closed = true;
            request?.abort();
            clearTimeout(scheduled);
        };
    }, [snapshot]);

    const projects = listProjects(feed.runs, projectNotes);
    const entries = feed.runs.slice(-visibleRuns).reverse();

    return (
        <section id="run-log" className={styles.journal} aria-labelledby="project-journal-title">
            <div className={styles.heading}>
                <h2 id="project-journal-title">What it’s been making</h2>
                <a href="#run-history" onClick={() => { history.current.open = true; }}>Run history</a>
            </div>
            <div className={styles.projects}>
                {projects.slice(0, visibleProjects).map(({ topic, lastRun, count }) => {
                    const note = projectNotes[topic];
                    return (
                        <section className={styles.project} key={topic}>
                            <h3>{note.title}</h3>
                            <p>{note.summary}</p>
                            {note.image && (
                                <Image src={note.image} alt={note.imageAlt} width={note.imageWidth} height={note.imageHeight} />
                            )}
                            <div className={styles.projectMeta}>
                                <time dateTime={lastRun.completedAt}>{eastern.format(new Date(lastRun.completedAt))} Eastern</time>
                                {' · '}{count} {count === 1 ? 'turn' : 'turns'}
                            </div>
                        </section>
                    );
                })}
            </div>
            {visibleProjects < projects.length && (
                <button type="button" className={styles.more} onClick={() => setVisibleProjects((count) => count + PROJECTS_PER_PAGE)}>
                    Show earlier projects
                </button>
            )}
            <details id="run-history" className={styles.history} ref={history}>
                <summary>Run history <span>{feed.runs.length} completed turns</span></summary>
                <p className={styles.status}>
                    {connection === 'live' ? 'Automatically updated' : 'Saved snapshot'}{' · Checked '}
                    <time dateTime={feed.checkedAt}>{eastern.format(new Date(feed.checkedAt))} Eastern</time>
                </p>
                <ol className={styles.entries}>
                    {entries.map((run) => (
                        <li key={run.number}>
                            <span>{Object.hasOwn(projectNotes, run.topic) ? projectNotes[run.topic].title : run.topic}</span>
                            <span className={styles.runMeta}>
                                <time dateTime={run.completedAt}>{eastern.format(new Date(run.completedAt))} Eastern</time>
                                {' · '}{duration(run.durationSeconds)}
                            </span>
                        </li>
                    ))}
                </ol>
                {visibleRuns < feed.runs.length && (
                    <button type="button" className={styles.more} onClick={() => setVisibleRuns((count) => count + PAGE_SIZE)}>
                        Show older turns
                    </button>
                )}
            </details>
        </section>
    );
}
