import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageLayout } from "../../components/PageLayout";
import { getAllPosts, getPostBySlug } from "../../lib/blog";
import { createPageMetadata } from "../../lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return post
    ? createPageMetadata({
        title: post.title,
        description: post.description,
        path: `/blog/${post.slug}`,
        type: "article",
        publishedTime: post.date,
      })
    : {};
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return <PageLayout eyebrow={`${post.date} · blog`} title={post.title} description={post.description}>
    <p className="post-back"><Link className="text-link" href="/blog">← Back to writing</Link></p>
    <article className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
  </PageLayout>;
}
