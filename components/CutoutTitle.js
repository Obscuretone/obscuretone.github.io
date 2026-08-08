import PostTitle from './PostTitle';

export default function CutoutTitle({ title, format = 'code' }) {
    return (
        <h1 className={`article-title article-title--${format}`}>
            <span className="article-title__prompt" aria-hidden="true">&gt;</span>
            <PostTitle title={title} format={format} />
        </h1>
    );
}
