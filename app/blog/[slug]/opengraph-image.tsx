import { ImageResponse } from "next/og";
import { SocialCard } from "../../components/SocialCard";
import { getPostBySlug } from "../../lib/blog";

export const alt = "An article by Francesco Peluso";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    <SocialCard
      eyebrow={post ? `${post.date} · writing` : "writing"}
      title={post?.title ?? "writing"}
      description={post?.description ?? "Notes by Francesco Peluso."}
    />,
    size,
  );
}
