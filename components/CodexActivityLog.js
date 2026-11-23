import { useEffect, useState } from 'react';
import styles from '../styles/CodexActivityLog.module.css';

const FEED_URL = 'https://watch.codexgonewild.com/activity.json';
const PAGE_SIZE = 12;
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

export default function CodexActivityLog({ snapshot }) {
    const [feed, setFeed] = useState(snapshot);
    const [connection, setConnection] = useState('snapshot');
    const [visible, setVisible] = useState(PAGE_SIZE);

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

    const entries = feed.runs.slice(-visible).reverse();

    return (
        <section id="run-log" className={styles.log} aria-labelledby="run-log-title">
            <h2 id="run-log-title">Run log</h2>
            <p className={styles.status} aria-live="polite">
                {connection === 'live' ? 'Automatically updated' : 'Saved snapshot'}
                {' · '}{feed.runs.length} completed turns{' · Checked '}
                <time dateTime={feed.checkedAt}>{eastern.format(new Date(feed.checkedAt))} Eastern</time>
            </p>
            <table className={styles.entries}>
                <thead>
                    <tr><th scope="col">Activity</th><th scope="col">Completed (Eastern)</th><th scope="col">Runtime</th></tr>
                </thead>
                <tbody>
                    {entries.map((run) => (
                        <tr key={run.number}>
                            <th scope="row">{run.topic}</th>
                            <td><time dateTime={run.completedAt}>{eastern.format(new Date(run.completedAt))}</time></td>
                            <td>{duration(run.durationSeconds)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {visible < feed.runs.length && (
                <button type="button" className={styles.older} onClick={() => setVisible((count) => count + PAGE_SIZE)}>
                    Show older turns
                </button>
            )}
        </section>
    );
}
