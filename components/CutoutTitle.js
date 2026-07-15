const PAPERS = ['#fcf7f8', '#eef7fd', '#ced3dc', '#dbeaf4', '#fff1f3'];
const INKS = ['#a31621', '#16232b', '#4e8098', '#314956', '#0f1720'];
const THEMES = [
    'globe-and-mail',
    'toronto-star',
    'national-post',
    'cbc-news',
    'ctv-news',
    'canadian-press',
    'le-devoir',
    'the-coast',
];
const TRANSFORMS = ['none', 'uppercase', 'none', 'none'];
const SHADOWS = [
    '2px 2px 0 rgba(163, 22, 33, 0.16)',
    '3px 2px 0 rgba(78, 128, 152, 0.22)',
    '1px 3px 0 rgba(144, 194, 231, 0.38)',
    '2px 2px 0 rgba(22, 35, 43, 0.18)',
];

function hashString(value) {
    let hash = 2166136261;

    for (let index = 0; index < value.length; index += 1) {
        hash ^= value.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }

    return hash >>> 0;
}

function pick(items, seed) {
    return items[seed % items.length];
}

function getWordStyle(word, index, contentSeed) {
    const seed = hashString(`${contentSeed}:${word}:${index}`);
    const rotate = ((seed % 900) / 100) - 4.5;
    const shift = (((seed >>> 8) % 11) - 5) / 10;
    const scale = 0.88 + (((seed >>> 12) % 25) / 100);
    const fontSize = 0.82 + (((seed >>> 16) % 43) / 100);
    const horizontalPadding = 0.1 + (((seed >>> 20) % 14) / 100);
    const verticalPadding = ((seed >>> 24) % 9) / 100;
    const weight = 500 + (((seed >>> 28) % 3) * 100);

    return {
        '--cutout-paper': pick(PAPERS, seed),
        '--cutout-ink': pick(INKS, seed >>> 4),
        '--cutout-rotate': `${rotate.toFixed(2)}deg`,
        '--cutout-shift': `${shift.toFixed(2)}em`,
        '--cutout-scale': scale.toFixed(2),
        '--cutout-size': `${fontSize.toFixed(2)}em`,
        '--cutout-padding-x': `${horizontalPadding.toFixed(2)}em`,
        '--cutout-padding-y': `${verticalPadding.toFixed(2)}em`,
        '--cutout-weight': weight,
        '--cutout-transform': pick(TRANSFORMS, seed >>> 6),
        '--cutout-shadow': pick(SHADOWS, seed >>> 11),
    };
}

function getWordTheme(word, index, contentSeed, previousTheme) {
    const seed = hashString(`${contentSeed}:theme:${word}:${index}`);
    const theme = pick(THEMES, seed);

    if (theme !== previousTheme || THEMES.length < 2) {
        return theme;
    }

    const nextIndex = (THEMES.indexOf(theme) + 1 + (seed % (THEMES.length - 1))) % THEMES.length;

    return THEMES[nextIndex] === previousTheme
        ? THEMES[(nextIndex + 1) % THEMES.length]
        : THEMES[nextIndex];
}

export default function CutoutTitle({ title, seedText }) {
    const words = title.split(/(\s+)/);
    const contentSeed = hashString(seedText || title);
    const clippings = [];
    let pendingSpace = '';
    let previousTheme = '';

    words.forEach((word, index) => {
        if (/^\s+$/.test(word)) {
            pendingSpace += word;
            return;
        }

        const theme = getWordTheme(word, index, contentSeed, previousTheme);

        clippings.push({
            text: `${clippings.length ? pendingSpace : ''}${word}`,
            word,
            index,
            theme,
            style: getWordStyle(word, index, contentSeed),
        });
        pendingSpace = '';
        previousTheme = theme;
    });

    return (
        <h1 className="cutout-title" aria-label={title}>
            {clippings.map((item, index) => (
                <span
                    key={`${item.word}-${item.index}-${index}`}
                    className={`cutout-title__word cutout-title__word--${item.theme}`}
                    style={item.style}
                    aria-hidden="true"
                >
                    {item.text}
                </span>
            ))}
        </h1>
    );
}
