import { getAllPostsByYear } from '@/lib/mdx'
import Link from 'next/link'

export default async function Home() {
  const postsByYear = await getAllPostsByYear()
  const years = Object.keys(postsByYear).sort((a, b) => b.localeCompare(a))

  return (
    <div>
      {years.map((year) => (
        <section key={year} className="not-prose text-base">
          <h2 className="px-5 py-10 font-bold">{year}</h2>
          {postsByYear[year]
            .sort(
              (a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
            )
            .map((post) => (
              <Link
                href={`/${post.path}`}
                className="flex items-baseline gap-4 group hover:bg-blue-50 cursor-pointer rounded-lg hover:dark:bg-blue-950 hover:dark:text-inherit hover:text-blue-700 transition-colors duration-100 dark:text-slate-300"
                key={post.path}
              >
                <article className="text-base p-5">
                  <time className="text-sm text-gray-500 w-20">
                    {new Date(post.metadata.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  <p className="font-medium my-0 ">{post.metadata.title}</p>
                </article>
              </Link>
            ))}
        </section>
      ))}
    </div>
  )
}
