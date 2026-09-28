import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TopographicField } from "./components/TopographicField";

export const metadata: Metadata = {
  title: { absolute: "Francesco's corner of the web" },
};

export default function Home() {
  return <main id="main-content" className="home-layout">
    <section className="hero page-sidebar">
      <Image className="hero-artwork home-artwork" src="/illustrations/terrain.png" alt="" fill priority sizes="(max-width: 900px) 100vw, 28vw" />
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
      </div>
    </div>
  </main>;
}
