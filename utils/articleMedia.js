// Markdown images pointing at local video assets become accessible native players.
// The Markdown sanitizer still runs first; remote and arbitrary HTML stay unchanged.
export function renderLocalVideos(htmlContent) {
    return htmlContent.replace(/<img\b[^>]*>/g, (image) => {
        const src = image.match(/\bsrc="([^"]+)"/)?.[1] || '';
        if (!/^\/videos\/[a-zA-Z0-9_-]+\.(mp4|webm)$/.test(src)) {
            return image;
        }

        const label = image.match(/\balt="([^"]*)"/)?.[1] || 'Gameplay video';
        const title = image.match(/\btitle="([^"]*)"/)?.[1] || '';
        const poster = title.match(/^poster: (\/images\/[a-zA-Z0-9_-]+\.(?:webp|png|jpg))$/)?.[1];
        const posterAttribute = poster ? ` poster="${poster}"` : '';
        const mime = src.endsWith('.mp4') ? 'video/mp4' : 'video/webm';

        return `<video controls playsinline preload="metadata" aria-label="${label}"${posterAttribute}>`
            + `<source src="${src}" type="${mime}">`
            + `<a href="${src}">Download the video</a></video>`;
    });
}
