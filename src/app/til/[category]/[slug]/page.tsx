import { createMetadata } from '@/lib/createMetadata'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = (await params).category
  const slug = (await params).slug
  const post = await import(`@/docs/til/${category}/${slug}.mdx`)

  return createMetadata({ post })
}

export default async function Page({ params }: PageProps) {
  const category = (await params).category
  const slug = (await params).slug

  const { default: Post } = await import(`@/docs/til/${category}/${slug}.mdx`)

  return <Post />
}
