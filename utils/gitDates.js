import { execFileSync } from 'child_process';
import path from 'path';

export function normalizeDate(value) {
    if (!value) {
        return null;
    }

    if (typeof value === 'string') {
        const normalized = value.trim();
        return Number.isNaN(Date.parse(normalized)) ? null : normalized;
    }

    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function getGitLogDates(filePath, extraArgs = []) {
    try {
        const relativePath = path.relative(process.cwd(), filePath);
        const output = execFileSync(
            'git',
            ['log', '--follow', ...extraArgs, '--format=%aI', '--', relativePath],
            {
                cwd: process.cwd(),
                encoding: 'utf8',
                stdio: ['ignore', 'pipe', 'ignore'],
            },
        ).trim();

        return output.split('\n').map((value) => value.trim()).filter(Boolean);
    } catch {
        return [];
    }
}

export function getGitFirstAdded(filePath) {
    const dates = getGitLogDates(filePath, ['--diff-filter=A']);
    return normalizeDate(dates.at(-1));
}

export function getGitLastUpdated(filePath) {
    return normalizeDate(getGitLogDates(filePath)[0]);
}
