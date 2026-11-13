import Head from 'next/head';
import { getPostsByLanguage } from '../utils/posts';
import { getCurrentRevision } from '../utils/revision';
import PostsList from '../components/PostsList';
import SiteHeader from '../components/SiteHeader';

export async function getStaticProps() {
    return {
        props: {
            englishPosts: getPostsByLanguage('en'),
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
            <a className="skip-link" href="#writing">Skip to writing</a>
            <SiteHeader revision={revision} />
            <main id="writing" className="home-main">
                <div className="home-intro">
                    <p className="eyebrow">Notes and essays</p>
                    <h1>Systems, software,<br />and stray signal.</h1>
                </div>
                <PostsList title="Writing" posts={englishPosts} />
            </main>
            <footer className="site-footer">
                <span>obscuretone</span>
                <span>Follow the connections.</span>
            </footer>
        </>
    );
}
