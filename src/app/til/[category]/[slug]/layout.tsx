import BlogLayout from '@/components/BlogLayout'
import { Header } from '@/components/MarkdownLayout'

interface LayoutProps {
  params: Promise<{ category: string; slug: string }>
  children: React.ReactNode
}

export default async function Layout({ children, params }: LayoutProps) {
  const { category, slug } = await params
  const { metadata } = await import(`@/docs/til/${category}/${slug}.mdx`)

  return (
    <>
      <Header title={metadata.title} />
      <BlogLayout>{children}</BlogLayout>
    </>
  )
}
