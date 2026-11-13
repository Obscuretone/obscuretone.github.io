import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { materializeScheduledPosts } from './materialize-scheduled-posts.mjs';

function fixture(run) {
    const root = fs.mkdtempSync(path.join(process.cwd(), '.schedule-test-'));
    fs.mkdirSync(path.join(root, 'scheduled-posts/en'), { recursive: true });
    const stage = (name, published, checked = '2026-11-13T01:00:00Z') => {
        fs.writeFileSync(path.join(root, 'scheduled-posts/en', name),
            `---\ntitle: Example\npublished: "${published}"\nsourcesCheckedAt: "${checked}"\n---\n\nArticle\n`);
    };
    try { run({ root, stage, publicPath: (name) => path.join(root, 'public/posts/en', name) }); }
    finally { fs.rmSync(root, { recursive: true, force: true }); }
}

test('publishes only due articles, at the exact boundary, without leaking future Markdown', () => fixture(({ root, stage, publicPath }) => {
    stage('first.md', '2026-11-13T09:00:00-05:00');
    stage('second.md', '2026-11-14T09:00:00-05:00');
    const before = new Date('2026-11-13T13:59:59Z');
    const due = new Date('2026-11-13T14:00:00Z');
    assert.deepEqual(materializeScheduledPosts({ root, now: before }), []);
    assert.equal(fs.existsSync(publicPath('first.md')), false);
    assert.deepEqual(materializeScheduledPosts({ root, now: due }), ['first.md']);
    assert.equal(fs.existsSync(publicPath('second.md')), false);
    assert.deepEqual(materializeScheduledPosts({ root, now: due }), ['first.md']);
    // Rebuilding for an earlier preview also removes our own generated output.
    materializeScheduledPosts({ root, now: before });
    assert.equal(fs.existsSync(publicPath('first.md')), false);
}));

test('rejects evidence checks later than publication before writing anything', () => fixture(({ root, stage, publicPath }) => {
    stage('first.md', '2026-11-13T14:00:00Z');
    stage('invalid.md', '2026-11-13T14:00:00Z', '2026-11-14T00:00:00Z');
    assert.throws(() => materializeScheduledPosts({ root, now: new Date('2026-11-15') }), /precedes its evidence/);
    assert.equal(fs.existsSync(publicPath('first.md')), false);
}));

test('rejects ambiguous dates and preserves an existing post on a slug collision', () => fixture(({ root, stage, publicPath }) => {
    stage('example.md', '2026-11-13');
    assert.throws(() => materializeScheduledPosts({ root }), /ISO timestamp/);
    stage('example.md', '2026-11-13T14:00:00Z');
    fs.mkdirSync(path.dirname(publicPath('example.md')), { recursive: true });
    fs.writeFileSync(publicPath('example.md'), 'Existing article');
    assert.throws(() => materializeScheduledPosts({ root }), /collides/);
    assert.equal(fs.readFileSync(publicPath('example.md'), 'utf8'), 'Existing article');
}));
