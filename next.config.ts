import createMDX from '@next/mdx'
import type { NextConfig } from 'next'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // 마크다운 및 MDX 파일을 포함하도록 `pageExtensions`를 구성합니다
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // 선택적으로 다른 Next.js 구성 추가 가
  // Note: Using the Rust compiler means we cannot use
  // rehype or remark plugins. For my app, this is fine.
  experimental: {
    mdxRs: true,
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

// MDX 구성과 Next.js 구성을 병합합니다
export default withMDX(nextConfig)

// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//   output: 'standalone',
//   reactStrictMode: true,
//   swcMinify: true,
// }

// export default nextConfig
