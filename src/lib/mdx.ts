import fs from 'fs'
import path from 'path'

interface Metadata {
  title: string
  tags: string[]
  date: string
  description?: string
  visibility?: 'public' | 'private'
}

interface Post {
  slug: string
  category?: string
  metadata: Metadata
  path: string
}

interface PostsByYear {
  [year: string]: Post[]
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
            path: `til/${category}/${file.replace('.mdx', '')}`,
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
        path: `review/${file.replace('.mdx', '')}`,
      }
    })
  )

  return posts.sort(
    (a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )
}

export async function getRecentPosts(): Promise<Post[]> {
  const tilPosts = await getTilPosts()
  const reviewPosts = await getReviewPosts()

  return [...tilPosts, ...reviewPosts]
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
    .slice(0, 10)
}

export async function getAllPostsByYear(): Promise<PostsByYear> {
  const tilPosts = await getTilPosts()
  const reviewPosts = await getReviewPosts()
  const allPosts = [...tilPosts, ...reviewPosts]

  return allPosts.reduce((acc, post) => {
    if (post.metadata.visibility === 'private') return acc

    const year = new Date(post.metadata.date).getFullYear().toString()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {} as PostsByYear)
}
