import { notFound } from "next/navigation";
import PostList from "@/components/post-list";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  if (posts.length === 0) notFound();

  return (
    <div>
      <section className="mb-10">
        <h1 className="font-mono text-lg text-foreground">#{decoded}</h1>
        <p className="mt-2 text-sm text-muted">{posts.length}개의 글</p>
      </section>
      <PostList posts={posts} />
    </div>
  );
}
