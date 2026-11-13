import PostTitle from './PostTitle';

export default function CutoutTitle({ title, format = 'prose' }) {
    return (
        <h1 className={`article-title article-title--${format}`}>
            <PostTitle title={title} format={format} />
        </h1>
    );
}
