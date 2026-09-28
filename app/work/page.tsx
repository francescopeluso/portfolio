import Link from "next/link";
import { PageLayout } from "../components/PageLayout";
import { TopographicField } from "../components/TopographicField";
import { projects } from "../lib/projects";
import { createPageMetadata } from "../lib/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description: "Selected software engineering, artificial intelligence, university, and hackathon projects by Francesco Peluso.",
  path: "/work",
});

export default function WorkPage() {
  return <PageLayout eyebrow="~/work" title="projects" description="Things I've built alone or with others — at work, at university, at hackathons, and on my own time.">
    <TopographicField variant="work" className="work-field content-lead-field" />
    <div className="project-list">
      {projects.map((p, i) => {
        const inner = <>
          <span className="row-num">{String(i + 1).padStart(2, "0")}</span>
          <div className="pr-main"><h2>{p.name}</h2><p>{p.description}</p></div>
          <div className="pr-meta"><span>{p.type.toLowerCase()}</span><span>{p.stack}</span></div>
          <span className="row-arrow" aria-hidden="true">{p.href ? "↗" : "—"}</span>
        </>;
        return p.href
          ? <Link key={p.name} className="pr-row" href={p.href} target="_blank" rel="noreferrer" aria-label={`${p.name}: ${p.description} (opens external project)`}>{inner}</Link>
          : <article key={p.name} className="pr-row">{inner}</article>;
      })}
    </div>
  </PageLayout>;
}
