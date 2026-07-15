import Head from 'next/head';
import { getPostsByLanguage } from '../utils/posts';
import { getCurrentRevision } from '../utils/revision';
import PostsList from '../components/PostsList';

export async function getStaticProps() {
  const englishPosts = getPostsByLanguage('en');

  return {
    props: {
      englishPosts,
      revision: getCurrentRevision(),
    },
  };
}

export default function Home({ englishPosts, revision }) {
  return (
    <>
      <Head>
        <title>obscuretone</title>
        <meta name="description" content="Systems notes, software projects, and essays on technology." />
      </Head>

      <header data-revision={revision}>
        <h1>obscuretone</h1>
        <h2>Systems, software, and stray signal</h2>
      </header>
      <hr />

      <footer>
        <PostsList title="Posts" posts={englishPosts} />
      </footer>
    </>
  );
}
