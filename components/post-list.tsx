import Link from "next/link";
import { TRACKS, type PostMeta } from "@/lib/posts";

type Props = {
  posts: PostMeta[];
  showBadge?: boolean;
};

const PostList = ({ posts, showBadge = true }: Props) => {
  if (posts.length === 0) {
    return <p className="text-muted">아직 글이 없어요.</p>;
  }

  return (
    <ul className="flex flex-col divide-y divide-border">
      {posts.map((post) => {
        const track = TRACKS[post.track];
        return (
          <li key={`${post.track}/${post.slug}`} className="py-5">
            <Link href={`/${post.track}/${post.slug}`} className="group block">
              <div className="mb-1 flex items-center gap-2 text-xs text-muted">
                {showBadge && <span>{track.label}</span>}
                {post.date && <time>{post.date}</time>}
              </div>
              <h2 className="text-lg font-medium group-hover:underline underline-offset-4">
                {post.title}
              </h2>
              {post.summary && (
                <p className="mt-1 text-sm text-muted">{post.summary}</p>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
