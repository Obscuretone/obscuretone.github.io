import Link from 'next/link';

function formatTags(tags) {
    if (tags.length <= 1) {
        return tags.join('');
    }

    if (tags.length === 2) {
        return `${tags[0]} and ${tags[1]}`;
    }

    return `${tags.slice(0, -1).join(', ')}, and ${tags[tags.length - 1]}`;
}

export default function NearbyArguments({ posts }) {
    if (!posts?.length) {
        return null;
    }

    return (
        <section className="nearby-arguments" aria-labelledby="nearby-arguments-title">
            <h3 id="nearby-arguments-title">Nearby Arguments</h3>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link href={`/posts/${post.slug}`}>
                            {post.title}
                        </Link>
                        <span>
                            Also about {formatTags(post.sharedTags)}.
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
