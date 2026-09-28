import Link from "next/link";

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-top">
      <div className="footer-brand">
        <p className="footer-name">francesco peluso</p>
        <p className="footer-caption">“I&apos;m smart enough to know that I&apos;m dumb.” — Richard Feynman</p>
      </div>
      <nav className="footer-col" aria-label="Site">
        <p>navigate</p>
        <Link href="/work">work</Link>
        <Link href="/about">about</Link>
        <Link href="/contact">contact</Link>
      </nav>
      <nav className="footer-col" aria-label="Personal pages">
        <p>personal</p>
        <Link href="/space">films &amp; music</Link>
        <Link href="/blog">writing</Link>
      </nav>
      <nav className="footer-col" aria-label="Elsewhere">
        <p>elsewhere</p>
        <Link href="https://github.com/francescopeluso" target="_blank" rel="noreferrer">github ↗</Link>
        <Link href="https://linkedin.com/in/francescopeluso04" target="_blank" rel="noreferrer">linkedin ↗</Link>
        <Link href="https://drive.google.com/file/d/1Z8OG1Du7OYnhpZW9pyCHdMU8PPHt17kM/view?usp=sharing" target="_blank" rel="noreferrer">résumé ↗</Link>
      </nav>
    </div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Francesco Peluso</p>
    </div>
  </footer>;
}
