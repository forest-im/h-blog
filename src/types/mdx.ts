export interface PostType {
  slug: string
  frontmatter?: any
  compiledContent?: any
  category: string
  content: string
  title: string
  date: string
  description?: string
  tags?: string[]
  [key: string]: any
}
