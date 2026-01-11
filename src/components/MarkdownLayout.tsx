import Link from 'next/link';
import { Footer } from './Footer';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  title?: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header
      className="sticky top-0 bg-white dark:bg-black py-3 z-10 border-b border-gray-200 dark:border-gray-800"
      suppressHydrationWarning
    >
      <div className="flex justify-between items-center max-w-2xl mx-auto px-5 md:px-9">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="block">
            <div
              className={`${title ? 'text-xs md:text-sm' : 'text-sm md:text-base'} text-black dark:text-gray-200 my-0 line-clamp-1 font-normal`}
            >
              {title ?? 'Hyunjung Im'}
            </div>
          </Link>
          {/* <nav className="flex items-center gap-3 md:gap-4">
            <Link
              href="/til"
              className="text-xs md:text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              TIL
            </Link>
            <Link
              href="/blog"
              className="text-xs md:text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              Blog
            </Link>
          </nav> */}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default function MarkdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="max-w-2xl mx-auto px-5 md:px-4 pb-10">
        <main className="max-w-none overflow-x-hidden">{children}</main>
      </div>
      <Footer />
    </>
  );
}
