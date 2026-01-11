import MarkdownLayout, { Header } from '@/components/MarkdownLayout';
import { PostList } from '@/components/PostList';
import { getAllPostsByYear } from '@/lib/mdx';

export default async function Home() {
  const postsByYear = await getAllPostsByYear();

  return (
    <>
      <Header />
      <MarkdownLayout>
        <PostList postsByYear={postsByYear} showType />
      </MarkdownLayout>
    </>
  );
}
