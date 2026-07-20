import Link from "next/link";
import { TRACKS } from "@/lib/posts";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-5 py-5">
          <Link href="/" className="font-semibold tracking-tight">
            블로그
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/til" className="text-muted hover:text-foreground">
              {TRACKS.til.label}
            </Link>
            <Link href="/blog" className="text-muted hover:text-foreground">
              {TRACKS.blog.label}
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-12">
        {children}
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto w-full max-w-2xl px-5 py-6 text-sm text-muted">
          학습 로그 · TIL / blog
        </div>
      </footer>
    </div>
  );
}
