import Link from 'next/link'

export default function MarkdownLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <header>
        <Link href="/" className="block no-underline">
          <h1 className="text-2xl my-2">Hyunjung Im</h1>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 text-sm -mt-1">Frontend Developer</p>
      </header>
      <main>{children}</main>
    </div>
  )
}
