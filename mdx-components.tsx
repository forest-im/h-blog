import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

// 공통 스타일 변수
const styles = {
  text: {
    base: 'text-base text-gray-800 dark:text-zinc-300 font-[500]',
    heading: 'text-gray-800 dark:text-zinc-200 font-[600]',
  },
  spacing: {
    heading: 'mt-6 mb-2',
  },
  link: {
    base: 'text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300',
    decoration: 'dark:underline dark:underline-offset-2 dark:decoration-gray-800',
  },
  list: {
    base: 'text-base text-gray-800 dark:text-zinc-300 pl-5 space-y-1',
  },
  code: {
    inline:
      'px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-[#0d1117] font-mono text-sm border border-gray-200 dark:border-gray-700 mx-1',
    block:
      'p-4 rounded-lg bg-gray-100 dark:bg-zinc-800 overflow-x-auto text-xs border border-gray-200 dark:border-gray-700',
  },
}

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>

const components = {
  h1: (props: HeadingProps) => <h1 className="font-medium text-2xl pt-10 mb-3" {...props} />,
  h2: (props: HeadingProps) => (
    <h2
      className={`${styles.text.heading} font-medium text-xl ${styles.spacing.heading}`}
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className={`${styles.text.heading} font-medium text-lg ${styles.spacing.heading}`}
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4
      className={`${styles.text.heading} font-medium text-base ${styles.spacing.heading}`}
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p className={`${styles.text.base} leading-relaxed my-4`} {...props} />
  ),
  ol: (props: ListProps) => <ol className={`${styles.list.base} list-decimal`} {...props} />,
  ul: (props: ListProps) => <ul className={`${styles.list.base} list-disc`} {...props} />,
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => <em className="font-medium italic" {...props} />,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = `${styles.link.base} ${styles.link.decoration}`

    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      )
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>
        {children}
      </a>
    )
  },
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-4 border-gray-300 pl-6 italic text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
      {...props}
    />
  ),
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table className="w-full my-6 border-collapse">
      <thead>
        <tr className="border-b dark:border-zinc-700">
          {data.headers.map((header, index) => (
            <th key={index} className="py-2 px-4 text-left font-medium">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index} className="border-b dark:border-zinc-800">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="py-2 px-4">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    // pre 태그 내부의 code인지 확인 (코드 블록)
    const isBlock = typeof children === 'object'

    return (
      <code className={isBlock ? styles.code.block : styles.code.inline} {...props}>
        {children}
      </code>
    )
  },
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre className="my-4 p-4 rounded-lg border-gray-800 border-1" {...props} />
  ),
}

declare global {
  type MDXProvidedComponents = typeof components
}

export function useMDXComponents(): MDXProvidedComponents {
  return components
}
