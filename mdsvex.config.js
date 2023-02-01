// import path from 'path';
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeKatexSvelte from "rehype-katex-svelte";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkAbbr from "remark-abbr";
import remarkMath from "remark-math";
import remarkHtml from "remark-html";

const config = {
	extensions: [".md", ".svelte"],
	smartypants: {
		dashes: "oldschool"
	},
	remarkPlugins: [remarkGfm, remarkMath, remarkAbbr, remarkHtml],
	rehypePlugins: [
		rehypeKatex,
		rehypeKatexSvelte,
		rehypeSlug,
		[rehypeAutolinkHeadings, { behavior: "wrap" }]
	]
};

export default config;
