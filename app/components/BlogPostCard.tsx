import { TransitionLink } from "./TransitionLink";

interface BlogPostCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export default function BlogPostCard({ slug, title, date, description }: BlogPostCardProps) {
  return (
    <div className="border border-white p-5 flex flex-col gap-2">
      <TransitionLink
        href={`/blog/${slug}`}
        className="text-base font-bold hover:bg-white hover:text-black px-1 -mx-1"
      >
        {title}
      </TransitionLink>
      <p className="text-xs opacity-60">{date}</p>
      <p className="text-sm leading-relaxed">{description}</p>
    </div>
  );
}
