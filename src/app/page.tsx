import { getRecentPosts } from '@/lib/mdx'
import Link from 'next/link'

export default async function Home() {
  const recentPosts = await getRecentPosts()

  console.log('hazel  recentPosts  ', recentPosts)

  return (
    <div>
      {recentPosts.map((post) => (
        <article key={post.slug}>
          <Link href={`/${post.path}`}>
            <h2>{post.metadata.title}</h2>
          </Link>
          <time>{new Date(post.metadata.date).toLocaleDateString('ko-KR')}</time>
          {post.metadata.tags && <div>{post.metadata.tags.join(' ')}</div>}
        </article>
      ))}
    </div>
  )
}
