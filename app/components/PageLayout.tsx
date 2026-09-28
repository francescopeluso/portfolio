import type { ReactNode } from "react";

type PageLayoutProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
};

export function PageLayout({ eyebrow, title, description, children, contentClassName = "" }: PageLayoutProps) {
  return <main id="main-content" className="split-page">
    <header className="page-head page-sidebar">
      <div className="page-head-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}<span className="cursor" aria-hidden="true" /></h1>
        {description && <div className="lede">{description}</div>}
      </div>
    </header>
    <div className={`page-content ${contentClassName}`.trim()}>{children}</div>
  </main>;
}
