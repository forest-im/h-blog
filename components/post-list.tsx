import Link from "next/link";
import { TRACKS, type PostMeta } from "@/lib/posts";

type Props = {
  posts: PostMeta[];
  showBadge?: boolean;
};

const PostList = ({ posts, showBadge = true }: Props) => {
  if (posts.length === 0) {
    return <p className="font-mono text-sm text-muted">// 아직 비어 있음</p>;
  }

  return (
    <ul className="flex flex-col">
      {posts.map((post, i) => {
        const track = TRACKS[post.track];
        return (
          <li key={`${post.track}/${post.slug}`} className="border-b border-border">
            <Link
              href={`/${post.track}/${post.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-5"
            >
              <span className="font-mono text-xs text-muted transition-colors group-hover:text-[var(--signal)]">
                [#{String(i + 1).padStart(2, "0")}]
              </span>
              <span className="min-w-0">
                <span className="text-[15px] text-foreground transition-colors group-hover:text-[var(--signal)]">
                  {post.title}
                </span>
                {showBadge && (
                  <span className="ml-2 font-mono text-xs text-muted">
                    {track.label.toLowerCase()}/
                  </span>
                )}
                {post.summary && (
                  <span className="mt-1 block text-sm text-muted">
                    {post.summary}
                  </span>
                )}
              </span>
              <span className="flex items-baseline gap-2 font-mono text-xs">
                {post.ai !== "human" && (
                  <span className="text-[var(--signal)]" title="AI 초안/보조">
                    ai
                  </span>
                )}
                {post.date && <time className="text-muted">{post.date}</time>}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
