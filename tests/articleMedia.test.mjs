import assert from 'node:assert/strict';
import test from 'node:test';
import { renderLocalVideos } from '../utils/articleMedia.js';

test('local MP4 gets controls, a poster and a fallback download', () => {
    const result = renderLocalVideos('<p><img src="/videos/mario.mp4" alt="Mario &amp; friends" title="poster: /images/mario.webp"></p>');
    assert.match(result, /<video controls playsinline preload="metadata"/);
    assert.match(result, /aria-label="Mario &amp; friends" poster="\/images\/mario.webp"/);
    assert.match(result, /type="video\/mp4"/);
    assert.match(result, /Download the video/);
    assert.doesNotMatch(result, /<img/);
});

test('ordinary images, remote videos and traversal paths remain untouched', () => {
    for (const src of ['/images/mario.png', 'https://example.com/mario.mp4', '/videos/../mario.mp4', '/videos/sub/mario.mp4']) {
        const input = `<img src="${src}" alt="Example">`;
        assert.equal(renderLocalVideos(input), input);
    }
});

test('WebM works without copying unrecognized image attributes', () => {
    const result = renderLocalVideos('<img src="/videos/mario.webm" alt="A &quot;shot&quot;" title="invalid" data-other="discard">');
    assert.match(result, /type="video\/webm"/);
    assert.match(result, /aria-label="A &quot;shot&quot;"/);
    assert.doesNotMatch(result, /poster=|data-other|title=/);
});
