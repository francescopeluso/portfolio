import Link from "next/link";
import { PageLayout } from "../components/PageLayout";
import { TopographicField } from "../components/TopographicField";
import { getAllPosts } from "../lib/blog";
import { createPageMetadata } from "../lib/metadata";

export const metadata = createPageMetadata({
  title: "Blog",
  description: "Notes by Francesco Peluso on software, artificial intelligence, design, projects, and the process behind the work.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  return <PageLayout eyebrow="~/blog" title="writing" description="Occasional notes.">
    <div className="blog-composition">
      <TopographicField variant="blog" className="blog-field content-lead-field" />
      {posts.length === 0
        ? <p className="lede">Nothing here yet.</p>
        : <div className="project-table blog-table" role="table" aria-label="Blog posts">
            <div className="pt-head" role="row"><span>date</span><span>title</span><span>notes</span><span /><span /></div>
            {posts.map((post) => <Link key={post.slug} className="pt-row" role="row" href={`/blog/${post.slug}`}>
              <span className="row-num" role="cell">{post.date}</span>
              <h2 role="cell">{post.title}</h2>
              <p className="pt-desc" role="cell">{post.description}</p>
              <span role="cell" /><span className="row-arrow" role="cell">→</span>
            </Link>)}
          </div>}
    </div>
  </PageLayout>;
}
