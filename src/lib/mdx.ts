import fs from 'fs';
import path from 'path';

interface Metadata {
  title: string;
  tags: string[];
  date: string;
  description?: string;
  visibility?: 'public' | 'private';
}

export interface Post {
  slug: string;
  category?: string;
  metadata: Metadata;
  path: string;
  type: string;
}

export interface PostsByYear {
  [year: string]: Post[];
}

const DOCS_PATH = path.join(process.cwd(), 'src/docs');

export async function getTilPosts(): Promise<Post[]> {
  const tilPath = path.join(DOCS_PATH, 'til');
  const folderName = 'til'; // 폴더명에서 동적으로 가져옴
  const categories = fs.readdirSync(tilPath);

  const posts = await Promise.all(
    categories.flatMap(async (category) => {
      const categoryPath = path.join(tilPath, category);
      if (!fs.statSync(categoryPath).isDirectory()) return [];

      const files = fs
        .readdirSync(categoryPath)
        .filter((file) => file.endsWith('.mdx'));

      const categoryPosts = await Promise.all(
        files.map(async (file) => {
          const { metadata } = await import(`@/docs/til/${category}/${file}`);
          return {
            slug: file.replace('.mdx', ''),
            category,
            metadata,
            path: `til/${category}/${file.replace('.mdx', '')}`,
            type: folderName,
          };
        })
      );

      return categoryPosts;
    })
  );

  return posts
    .flat()
    .sort(
      (a, b) =>
        new Date(b?.metadata?.date).getTime() -
        new Date(a.metadata.date).getTime()
    );
}

export async function getBlogPosts(): Promise<Post[]> {
  const reviewPath = path.join(DOCS_PATH, 'review');
  const folderName = 'review'; // 폴더명에서 동적으로 가져옴
  const files = fs
    .readdirSync(reviewPath)
    .filter((file) => file.endsWith('.mdx'));

  const posts = await Promise.all(
    files.map(async (file) => {
      const { metadata } = await import(`@/docs/review/${file}`);
      return {
        slug: file.replace('.mdx', ''),
        metadata,
        path: `blog/${file.replace('.mdx', '')}`,
        type: folderName,
      };
    })
  );

  return posts.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
}

export async function getRecentPosts(): Promise<Post[]> {
  const tilPosts = await getTilPosts();
  const blogPosts = await getBlogPosts();

  return [...tilPosts, ...blogPosts]
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime()
    )
    .slice(0, 10);
}

export async function getAllPostsByYear(): Promise<PostsByYear> {
  const tilPosts = await getTilPosts();
  const blogPosts = await getBlogPosts();
  const allPosts = [...tilPosts, ...blogPosts];

  return allPosts.reduce((acc, post) => {
    if (post.metadata.visibility === 'private') return acc;

    const year = new Date(post.metadata.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as PostsByYear);
}
