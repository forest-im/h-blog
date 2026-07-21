import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type Track = 'til' | 'blog';

export const TRACKS: Record<Track, { label: string; description: string }> = {
  til: {
    label: 'TIL',
    description: '오늘 배운 것을 짧게 기록합니다.',
  },
  blog: {
    label: 'blog',
    description: '생각을 조금 더 길게 정리합니다.',
  },
};

export const TRACK_ORDER: Track[] = ['til', 'blog'];

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type PostMeta = {
  track: Track;
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
};

export type Post = PostMeta & { content: string };

export function isTrack(value: string): value is Track {
  return value === 'til' || value === 'blog';
}

export function getPostSlugs(track: Track): string[] {
  const dir = path.join(CONTENT_DIR, track);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getPost(track: Track, slug: string): Post {
  const fullPath = path.join(CONTENT_DIR, track, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  return {
    track,
    slug,
    title: typeof data.title === 'string' ? data.title : slug,
    date:
      typeof data.date === 'string'
        ? data.date
        : data.date instanceof Date
          ? data.date.toISOString().slice(0, 10)
          : '',
    summary: typeof data.summary === 'string' ? data.summary : '',
    tags: Array.isArray(data.tags)
      ? data.tags.filter((t): t is string => typeof t === 'string')
      : [],
    content,
  };
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const t of post.tags) tags.add(t);
  }
  return [...tags].sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getPostsByTrack(track: Track): PostMeta[] {
  return getPostSlugs(track)
    .map((slug) => {
      const { content: _content, ...meta } = getPost(track, slug);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPosts(): PostMeta[] {
  return TRACK_ORDER.flatMap((track) => getPostsByTrack(track)).sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
}
