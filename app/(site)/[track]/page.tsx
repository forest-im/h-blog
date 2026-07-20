import { notFound } from "next/navigation";
import PostList from "@/components/post-list";
import { TRACK_ORDER, TRACKS, getPostsByTrack, isTrack } from "@/lib/posts";

export function generateStaticParams() {
  return TRACK_ORDER.map((track) => ({ track }));
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track } = await params;
  if (!isTrack(track)) notFound();

  const meta = TRACKS[track];
  const posts = getPostsByTrack(track);

  return (
    <div>
      <section className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">{meta.label}</h1>
        <p className="mt-2 text-muted">{meta.description}</p>
      </section>
      <PostList posts={posts} showBadge={false} />
    </div>
  );
}
