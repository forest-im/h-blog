import BlogLayout from '@/components/BlogLayout'
import { Header } from '@/components/MarkdownLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <BlogLayout>{children}</BlogLayout>
    </>
  )
}
