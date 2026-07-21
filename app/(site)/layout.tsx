import TopBar from "@/components/top-bar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="site-grain" aria-hidden />
      <TopBar />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-12">
        {children}
      </main>
      <footer className="border-t border-border">
        <div className="meta-label mx-auto w-full max-w-2xl px-5 py-6 text-muted">
          LEARNING LOG
        </div>
      </footer>
    </div>
  );
}
