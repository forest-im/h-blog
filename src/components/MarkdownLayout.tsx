import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  title?: string
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="border-gray-50 sticky top-0 backdrop-blur-sm py-2 z-10">
      <div className="flex justify-between items-center max-w-2xl mx-auto px-9 ">
        <div>
          <Link href="/" className="block">
            <h1 className={`${title ? 'text-m' : 'text-xl'} text-gray-600 my-2 line-clamp-1`}>
              {title ?? 'Hyunjung Im'}
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/forest-im"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <GithubIcon />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default function MarkdownLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-10">
      <main className="max-w-none overflow-x-hidden">{children}</main>
    </div>
  )
}

const GithubIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  )
}
