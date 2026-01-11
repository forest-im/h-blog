import MarkdownLayout, { Header } from '@/components/MarkdownLayout';
import { PostList } from '@/components/PostList';
import { getTilPosts } from '@/lib/mdx';

export default async function TilPage() {
  const tilPosts = await getTilPosts();

  // 연도별로 그룹화
  const postsByYear = tilPosts.reduce(
    (acc, post) => {
      const year = new Date(post.metadata.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<string, typeof tilPosts>
  );

  return (
    <>
      <Header />
      <MarkdownLayout>
        <div className="not-prose">
          <h1 className="text-xl font-normal mt-8 mb-8 text-black dark:text-gray-200">
            Today I Learned
          </h1>
          <PostList postsByYear={postsByYear} />
        </div>
      </MarkdownLayout>
    </>
  );
}
