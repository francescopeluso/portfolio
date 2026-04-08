import { TransitionLink } from "../../components/TransitionLink";
import BlinkingCursor from "../../components/BlinkingCursor";
import Typewriter from "../../components/TypingEffect";
import { getAllPosts, getPostBySlug } from "../../lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.description,
  };
}

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug);

  return (
    <div className="flex flex-col gap-8 tui-enter">
      <TransitionLink
        href="/blog"
        className="border border-white px-3 py-1 text-sm self-start hover:bg-white hover:text-black"
      >
        &larr; cd ..
      </TransitionLink>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg md:text-3xl font-semibold">{post.title}</h2>
        <p className="text-xs opacity-60">{post.date}</p>
      </div>

      <article className="prose text-sm leading-relaxed">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [rehypeKatex],
            },
          }}
        />
      </article>
    </div>
  );
}
