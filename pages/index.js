import Head from 'next/head';
import { getPostsByLanguage } from '../utils/posts'; // You should have a utility function that fetches posts
import PostsList from '../components/PostsList';

export async function getStaticProps() {
  // Fetch all English and French posts using the helper function
  const englishPosts = getPostsByLanguage('en');
  const frenchPosts = getPostsByLanguage('fr');

  return {
    props: {
      englishPosts,
      frenchPosts,
    },
  };
}

export default function Home({ englishPosts, frenchPosts }) {
  return (
    <>

      <Head>
        <title>Evan d'Entremont</title>
        <meta name="description" content="Musings on Tech" />
      </Head>

      <header>
        <h1>Evan d'Entremont</h1>
        <h2>Musings on Tech</h2>
      </header>
      <hr />

      <footer>
        <PostsList title="English Posts" posts={englishPosts} />
        <PostsList title="Articles en Français" posts={frenchPosts} />
      </footer>
    </>
  );
}