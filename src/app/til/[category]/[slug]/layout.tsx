import BlogLayout from '@/components/BlogLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BlogLayout>{children}</BlogLayout>
}
