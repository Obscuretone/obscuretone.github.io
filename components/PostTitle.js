const HYBRID_SEPARATOR = ' — ';

function splitHybridTitle(title) {
    const separatorIndex = title.indexOf(HYBRID_SEPARATOR);

    if (separatorIndex === -1) {
        return [title, ''];
    }

    return [
        title.slice(0, separatorIndex),
        title.slice(separatorIndex + HYBRID_SEPARATOR.length),
    ];
}

export default function PostTitle({ title, format = 'prose' }) {
    if (format === 'code') {
        return <code className="post-title__code">{title}</code>;
    }

    if (format === 'hybrid') {
        const [codeTitle, policyTitle] = splitHybridTitle(title);

        return (
            <>
                <code className="post-title__code">{codeTitle}</code>
                {policyTitle && (
                    <>
                        <span className="post-title__separator"> — </span>
                        <span className="post-title__policy">{policyTitle}</span>
                    </>
                )}
            </>
        );
    }

    return title;
}
