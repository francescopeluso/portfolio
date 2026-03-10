import { TransitionLink } from "../components/TransitionLink";
import BlinkingCursor from "../components/BlinkingCursor";
import Typewriter from "../components/TypingEffect";
import BlogPostCard from "../components/BlogPostCard";
import { getAllPosts } from "../lib/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <TransitionLink
        href="/"
        className="border border-white px-3 py-1 text-sm self-start hover:bg-white hover:text-black transition-all duration-150"
      >
        &larr; cd ..
      </TransitionLink>

      <h2 className="text-xl md:text-2xl font-bold">
        $ <Typewriter text="ls ~/blog" />
        <BlinkingCursor />
      </h2>

      <div className="flex flex-col gap-4 w-full">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
