// import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import rehypeSlug from 'rehype-slug';
import remarkAbbr from 'remark-abbr';
import remarkMath from 'remark-math';
// import react-syntax-highlighter/dist/cjs/styles/prism/index.js as ;
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// import { fileURLToPath } from 'url';
// import matter from 'gray-matter';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const config = {
	extensions: ['.md', '.svelte'],
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [remarkMath, remarkAbbr],
	rehypePlugins: [rehypeKatexSvelte, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]
	// layout: {
	// 	_: path.join(__dirname, './src/components/LayoutDefault.svelte')
	// }
	// highlight: {
	// 	highlighter: { alias: { coy: 'javascript' } }
	// },
};

export default config;
