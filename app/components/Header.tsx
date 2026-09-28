import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return <header className="site-header">
    <Link className="wordmark" href="/">francesco peluso</Link>
    <nav className="main-nav" aria-label="Main navigation">
      <Link href="/">home</Link><Link href="/work">work</Link><Link href="/about">about</Link><Link href="/contact">contact</Link><Link href="/blog">blog</Link><Link href="/space">space</Link>
    </nav>
    <nav className="social-links" aria-label="Elsewhere">
      <Link href="https://github.com/francescopeluso" target="_blank" rel="noreferrer">github ↗</Link>
      <Link href="https://linkedin.com/in/francescopeluso04" target="_blank" rel="noreferrer">linkedin ↗</Link>
      <Link href="https://drive.google.com/file/d/1Z8OG1Du7OYnhpZW9pyCHdMU8PPHt17kM/view?usp=sharing" target="_blank" rel="noreferrer">résumé ↗</Link>
    </nav>
    <ThemeToggle />
  </header>;
}
