import fs from 'fs'
import path from 'path'

interface Metadata {
  title: string
  tags: string[]
  date: string
  description?: string
}

interface Post {
  slug: string
  category?: string
  metadata: Metadata
}

interface RecentPost extends Post {
  path: string
}

const DOCS_PATH = path.join(process.cwd(), 'src/docs')

export async function getTilPosts(): Promise<Post[]> {
  const tilPath = path.join(DOCS_PATH, 'til')
  const categories = fs.readdirSync(tilPath)

  const posts = await Promise.all(
    categories.flatMap(async (category) => {
      const categoryPath = path.join(tilPath, category)
      if (!fs.statSync(categoryPath).isDirectory()) return []

      const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith('.mdx'))

      const categoryPosts = await Promise.all(
        files.map(async (file) => {
          const { metadata } = await import(`@/docs/til/${category}/${file}`)
          return {
            slug: file.replace('.mdx', ''),
            category,
            metadata,
          }
        })
      )

      return categoryPosts
    })
  )

  return posts
    .flat()
    .sort((a, b) => new Date(b?.metadata?.date).getTime() - new Date(a.metadata.date).getTime())
}

export async function getReviewPosts(): Promise<Post[]> {
  const reviewPath = path.join(DOCS_PATH, 'reviews')
  const files = fs.readdirSync(reviewPath).filter((file) => file.endsWith('.mdx'))

  const posts = await Promise.all(
    files.map(async (file) => {
      const { metadata } = await import(`@/docs/reviews/${file}`)
      return {
        slug: file.replace('.mdx', ''),
        metadata,
      }
    })
  )

  return posts.sort(
    (a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )
}

export async function getRecentPosts(): Promise<RecentPost[]> {
  const tilPosts = await getTilPosts()
  const reviewPosts = await getReviewPosts()

  const recentPosts = [
    ...tilPosts.map((post) => ({
      ...post,
      path: `til/${post.category}/${post.slug}`,
    })),
    ...reviewPosts.map((post) => ({
      ...post,
      path: `review/${post.slug}`,
    })),
  ]
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
    .slice(0, 10)

  return recentPosts
}
