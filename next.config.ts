import createMDX from '@next/mdx'
import type { NextConfig } from 'next'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // 마크다운 및 MDX 파일을 포함하도록 `pageExtensions`를 구성합니다
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false,
  },
  transpilePackages: ['three'],
  eslint: {
    // 빌드 시 ESLint를 비활성화하고 Biome 사용
    ignoreDuringBuilds: true,
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkMath],
    // rehypePlugins: [[rehypeHighlight, { ignoreMissing: true }, rehypeCodeTitles]],
    rehypePlugins: [rehypeKatex, [rehypeHighlight, { ignoreMissing: true }]],
  },
})

export default withMDX(nextConfig)
