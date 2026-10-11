import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "../components/PageLayout";
import { TopographicField } from "../components/TopographicField";
import { createPageMetadata } from "../lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description: "About Francesco Peluso: computer engineer, artificial intelligence student, and full-stack developer.",
  path: "/about",
});

export default function AboutPage() {
  return <PageLayout eyebrow="~/about" title="about">
    <div className="about-hero">
      <figure className="about-portrait">
        <Image className="halftone" src="/propic.webp" alt="Francesco Peluso" width={900} height={900} sizes="(max-width: 900px) 100vw, 40vw" priority />
      </figure>
      <div className="about-body">
        <p>I&apos;m Francesco, a computer engineer with four years of experience building web applications, APIs, and embedded software. I&apos;m now pursuing an M.Sc. in Computer Engineering, focused on artificial intelligence and its applications.</p>
        <p>I like turning complex ideas into software people can actually use: carefully designed, dependable, and clear about what it does.</p>
        <p>Away from the screen: cinema, music, collecting vinyl, and learning guitar one song at a time.</p>
        <p className="page-foot"><Link className="text-link" href="https://drive.google.com/file/d/1Z8OG1Du7OYnhpZW9pyCHdMU8PPHt17kM/view?usp=sharing" target="_blank" rel="noreferrer">View full résumé <span aria-hidden="true">↗</span></Link></p>
        <TopographicField variant="about" className="about-field" />
      </div>
    </div>

    <div className="about-timeline">
        <section className="fact-section" aria-labelledby="education-title">
          <h2 id="education-title">Education</h2>
          <div className="fact-list">
            <div className="fact-row"><span>2025 — now</span><p><strong>M.Sc. Computer Engineering</strong> · University of Salerno · <em>Artificial Intelligence</em> track</p></div>
            <div className="fact-row fact-row--nested"><span>2026</span><p>NeaPolis Innovation Summer Campus (13th edition) · STMicroelectronics Italy (Naples)</p></div>
            <div className="fact-row"><span>2022 — 2025</span><p><strong>B.Sc. Computer Engineering</strong> · University of Salerno · <em>Software</em> track · 106/110</p></div>
            <div className="fact-row fact-row--nested"><span>2025</span><p>Swift App Development Bootcamp · University of Salerno</p></div>
            <div className="fact-row"><span>2017 — 2022</span><p><strong>IT &amp; Telecommunications</strong> · I.I.S. Mattei-Fortunato, Eboli (SA) · 100/100 with distinction</p></div>
          </div>
        </section>

      <section className="fact-section" aria-labelledby="experience-title">
        <h2 id="experience-title">Work experience</h2>
        <div className="fact-list">
          <div className="fact-row"><span>2022 — 2026</span><p><strong>Full-stack developer</strong> · Considera S.R.L.</p></div>
        </div>
      </section>
      
    </div>
  </PageLayout>;
}
