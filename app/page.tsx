import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TopographicField } from "./components/TopographicField";
import { getAllPosts } from "./lib/blog";

export const metadata: Metadata = {
  title: { absolute: "Francesco's corner of the web" },
};

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  return <main id="main-content" className="home-layout">
    <section className="hero page-sidebar">
      <Image className="hero-artwork home-artwork" src="/illustrations/terrain.webp" alt="" fill priority fetchPriority="high" quality={60} sizes="(max-width: 900px) 100vw, 28vw" />
      <div className="hero-copy">
        <h1>francesco peluso<span className="cursor" aria-hidden="true" /></h1>
        <p className="hero-text">M.Sc. Computer Engineering student - Artificial Intelligence @ University of Salerno</p>
      </div>
    </section>
    <div className="home-content">
      <div className="home-panel">
        <div className="home-intro-visual">
          <TopographicField variant="home" className="home-content-field" />
          <p className="home-welcome">Welcome to my little corner of the web.</p>
        </div>
        <nav className="index" aria-label="Index">
          <Link className="list-row" href="/work"><span className="row-num">01</span><h2>work</h2><p>projects, experiments, hackathons</p><span className="row-arrow">→</span></Link>
          <Link className="list-row" href="/about"><span className="row-num">02</span><h2>about</h2><p>who i am, where i&apos;ve been</p><span className="row-arrow">→</span></Link>
          <Link className="list-row" href="/blog"><span className="row-num">03</span><h2>blog</h2><p>occasional writing</p><span className="row-arrow">→</span></Link>
          <Link className="list-row" href="/space"><span className="row-num">04</span><h2>space</h2><p>films, music, personal</p><span className="row-arrow">→</span></Link>
          <Link className="list-row" href="/contact"><span className="row-num">05</span><h2>contact</h2><p>have an idea? let&apos;s talk</p><span className="row-arrow">→</span></Link>
        </nav>
        {posts.length > 0 && <section className="latest-posts" aria-labelledby="latest-posts-title">
          <div className="latest-head">
            <h2 id="latest-posts-title">Latest blog posts</h2>
            <Link href="/blog">all posts →</Link>
          </div>
          <div className="post-tiles">
            {posts.map((post) => <Link key={post.slug} className="post-tile" href={`/blog/${post.slug}`}>
              <span className="row-num">{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <span className="row-arrow">→</span>
            </Link>)}
          </div>
        </section>}
      </div>
    </div>
  </main>;
}
