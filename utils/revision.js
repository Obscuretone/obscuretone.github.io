import { execFileSync } from 'child_process';

export function getCurrentRevision() {
    try {
        return execFileSync(
            'git',
            ['rev-parse', '--short=8', 'HEAD'],
            { cwd: process.cwd(), encoding: 'utf8' },
        ).trim();
    } catch {
        return 'unknown';
    }
}
