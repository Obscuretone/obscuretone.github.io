function getTagCounts(posts) {
    const counts = new Map();

    posts.forEach((post) => {
        (post.tags || []).forEach((tag) => {
            counts.set(tag, (counts.get(tag) || 0) + 1);
        });
    });

    return counts;
}

function getSharedTags(left = [], right = []) {
    const rightTags = new Set(right);

    return left.filter((tag) => rightTags.has(tag));
}

function scoreSharedTags(sharedTags, tagCounts) {
    const rareTagScore = sharedTags.reduce((score, tag) => (
        score + 1 + (1 / (tagCounts.get(tag) || 1))
    ), 0);

    return rareTagScore + Math.max(0, sharedTags.length - 1) * 0.75;
}

export function getNearbyArguments(currentPost, posts, limit = 4) {
    const tagCounts = getTagCounts(posts);

    return posts
        .filter((post) => post.slug !== currentPost.slug)
        .map((post) => {
            const sharedTags = getSharedTags(currentPost.tags, post.tags);

            return {
                ...post,
                sharedTags: sharedTags
                    .sort((left, right) => (
                        (tagCounts.get(left) || 0) - (tagCounts.get(right) || 0)
                        || left.localeCompare(right)
                    ))
                    .slice(0, 3),
                score: scoreSharedTags(sharedTags, tagCounts),
            };
        })
        .filter((post) => post.sharedTags.length > 0)
        .sort((left, right) => (
            right.score - left.score
            || right.sharedTags.length - left.sharedTags.length
            || left.title.localeCompare(right.title)
        ))
        .slice(0, limit);
}
