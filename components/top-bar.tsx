import Link from "next/link";

// 공용 상단 바 — 인트로와 사이트 페이지가 동일하게 사용
export default function TopBar() {
  return (
    <header className="relative z-10 flex items-start justify-between p-6 sm:p-8">
      <Link href="/" className="intro-meta intro-enter">
        HAZEL<span className="text-[var(--signal)]">®</span>
      </Link>
      <div className="flex items-center gap-6">
        <nav className="flex items-center gap-5">
          <Link href="/til" className="intro-enter intro-meta">
            [ TIL ]
          </Link>
          <Link href="/blog" className="intro-enter intro-meta">
            [ BLOG ]
          </Link>
        </nav>
        <span className="intro-meta hidden sm:inline">37.57°N 126.98°E</span>
      </div>
    </header>
  );
}
