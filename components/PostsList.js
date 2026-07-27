// components/PostsList.js
import Link from 'next/link';

function formatPublishedDate(value) {
    const dateParts = typeof value === 'string'
        ? value.match(/^(\d{4})-(\d{2})-(\d{2})/)
        : null;

    if (!dateParts) {
        return null;
    }

    const [, year, month, day] = dateParts;
    return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
        .toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC',
        });
}

export default function PostsList({ title, posts }) {
    return (
        <section>
            <h3>{title}</h3>
            <ul className="posts-list">
                {posts.map((post) => {
                    const publishedDate = formatPublishedDate(post.publishedAt);

                    return (
                        <li key={post.slug}>
                            <Link href={`/posts/${post.slug}`}>
                                {post.title}
                            </Link>
                            {publishedDate && (
                                <time dateTime={post.publishedAt}>{publishedDate}</time>
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
