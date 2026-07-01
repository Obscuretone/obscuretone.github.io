import Head from 'next/head';
import { getPostsByLanguage } from '../utils/posts';
import PostsList from '../components/PostsList';

export async function getStaticProps() {
  const englishPosts = getPostsByLanguage('en');

  return {
    props: {
      englishPosts,
    },
  };
}

export default function Home({ englishPosts }) {
  return (
    <>
      <Head>
        <title>Evan d&apos;Entremont</title>
        <meta name="description" content="Musings on Tech" />
      </Head>

      <header>
        <h1>Evan d&apos;Entremont</h1>
        <h2>Musings on Tech</h2>
      </header>
      <hr />

      <footer>
        <PostsList title="Posts" posts={englishPosts} />
      </footer>
    </>
  );
}
