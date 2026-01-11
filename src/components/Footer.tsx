export function Footer() {
  return (
    <footer
      className="border-t border-gray-200 dark:border-gray-800 mt-20 py-8"
      suppressHydrationWarning
    >
      <div className="max-w-2xl mx-auto px-5 md:px-9">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/forest-im"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-gray-200 transition-colors"
            >
              GitHub
            </a>
            {/* <a
              href="mailto:your-email@example.com"
              className="hover:text-black dark:hover:text-gray-200 transition-colors"
            >
              Email
            </a> */}
          </div>
          <div suppressHydrationWarning>© {new Date().getFullYear()}</div>
        </div>
      </div>
    </footer>
  );
}
