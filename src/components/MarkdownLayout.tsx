export default function MarkdownLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <main>{children}</main>
    </div>
  )
}
