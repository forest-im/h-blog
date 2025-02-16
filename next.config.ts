import createMDX from '@next/mdx'
import type { NextConfig } from 'next'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // 마크다운 및 MDX 파일을 포함하도록 `pageExtensions`를 구성합니다
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false,
  },
  transpilePackages: ['three'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    // rehypePlugins: [[rehypeHighlight, { ignoreMissing: true }, rehypeCodeTitles]],
    rehypePlugins: [[rehypeHighlight, { ignoreMissing: true }]],
  },
})

export default withMDX(nextConfig)
