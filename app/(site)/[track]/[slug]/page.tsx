import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import AiLabel from "@/components/ai-label";
import { notFound } from "next/navigation";
import {
  TRACK_ORDER,
  TRACKS,
  getPost,
  getPostSlugs,
  isTrack,
  type Post,
} from "@/lib/posts";

export function generateStaticParams() {
  return TRACK_ORDER.flatMap((track) =>
    getPostSlugs(track).map((slug) => ({ track, slug })),
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;
  if (!isTrack(track)) notFound();

  let post: Post;
  try {
    post = getPost(track, slug);
  } catch {
    notFound();
  }

  const meta = TRACKS[track];

  return (
    <article>
      <div className="mb-3 flex items-center gap-3 font-mono text-xs text-muted">
        <Link
          href={`/${track}`}
          className="transition-colors hover:text-[var(--signal)]"
        >
          {meta.label.toLowerCase()}/
        </Link>
        {post.date && <time>{post.date}</time>}
        <AiLabel level={post.ai} />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">{post.title}</h1>
      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-muted transition-colors hover:text-[var(--signal)]"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
      <div className="post-content mt-8">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
