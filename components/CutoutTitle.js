import PostTitle from './PostTitle';

export default function CutoutTitle({ title, format = 'prose' }) {
    const usesTerminalFormat = format === 'code' || format === 'hybrid';

    return (
        <h1 className={`article-title article-title--${format}`}>
            {usesTerminalFormat && (
                <span className="article-title__prompt" aria-hidden="true">&gt;</span>
            )}
            <PostTitle title={title} format={format} />
        </h1>
    );
}
