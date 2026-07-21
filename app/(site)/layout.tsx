import Link from "next/link";
import { TRACKS } from "@/lib/posts";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="site-grain" aria-hidden />
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-5 py-5">
          <Link href="/" className="meta-label text-foreground">
            HAZEL<span className="text-[var(--signal)]">®</span>
          </Link>
          <nav className="meta-label flex items-center gap-5">
            <Link
              href="/til"
              className="text-muted transition-colors hover:text-[var(--signal)]"
            >
              [ {TRACKS.til.label} ]
            </Link>
            <Link
              href="/blog"
              className="text-muted transition-colors hover:text-[var(--signal)]"
            >
              [ {TRACKS.blog.label} ]
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-12">
        {children}
      </main>
      <footer className="border-t border-border">
        <div className="meta-label mx-auto w-full max-w-2xl px-5 py-6 text-muted">
          LEARNING LOG — SEOUL
        </div>
      </footer>
    </div>
  );
}
