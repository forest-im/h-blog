import { format, parseISO } from 'date-fns';
import Link from 'next/link';

interface Post {
  path: string;
  metadata: {
    title: string;
    date: string;
  };
  type?: 'til' | 'blog';
}

interface PostsByYear {
  [year: string]: Post[];
}

interface PostListProps {
  postsByYear: PostsByYear;
  showType?: boolean;
}

export function PostList({ postsByYear, showType = false }: PostListProps) {
  const years = Object.keys(postsByYear).sort((a, b) => b.localeCompare(a));

  return (
    <>
      {years.map((year) => (
        <section key={year} className="not-prose text-sm mb-10">
          <h2 className="px-5 md:px-0 py-4 font-normal text-gray-400 dark:text-gray-600 text-xs">
            {year}
          </h2>
          {postsByYear[year]
            .sort(
              (a, b) =>
                new Date(b.metadata.date).getTime() -
                new Date(a.metadata.date).getTime()
            )
            .map((post) => (
              <Link
                href={`/${post.path}`}
                className="flex items-baseline gap-3 md:gap-4 group hover:text-gray-500 dark:hover:text-gray-400 cursor-pointer transition-colors duration-150 dark:text-gray-200 py-1 px-5 md:px-0"
                key={post.path}
              >
                <time className="text-s text-gray-400 dark:text-gray-500 w-10 md:w-12 flex-shrink-0">
                  {format(parseISO(post.metadata.date), 'MMM d')}
                </time>
                {showType && post.type && (
                  <span className="hidden md:inline text-s text-gray-400 dark:text-gray-600 lowercase w-10 flex-shrink-0">
                    {post.type}
                  </span>
                )}
                <p className="font-normal my-0 text-sm">
                  {post.metadata.title}
                </p>
              </Link>
            ))}
        </section>
      ))}
    </>
  );
}
