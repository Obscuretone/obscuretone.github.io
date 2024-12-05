// components/PostsList.js
import Link from 'next/link';

export default function PostsList({ title, posts }) {
    return (
        <section>
            <h3>{title}</h3>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link href={`/posts/${post.slug}`}>
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}