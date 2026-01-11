import MarkdownLayout from './MarkdownLayout';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MarkdownLayout>
      <div className="p-5">{children}</div>
    </MarkdownLayout>
  );
}
