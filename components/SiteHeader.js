import Link from 'next/link';

export default function SiteHeader({ revision }) {
    return (
        <header className="site-header" data-revision={revision}>
            <Link className="site-brand" href="/">obscuretone<span aria-hidden="true">.</span></Link>
            <nav aria-label="Main navigation">
                <Link href="/">Writing</Link>
                <Link href="/posts/en/_about_me">About</Link>
            </nav>
        </header>
    );
}
