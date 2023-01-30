// import { slugFromPath } from '$lib/slugFromPath';
import { error } from '@sveltejs/kit';

const slugFromPath = (path) => path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;

export const load = async ({ params }) => {
	const { fileName } = params;

	const modules = import.meta.glob(`/src/posts/*/*.{md,svx,svelte.md}`);

	let match = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === fileName) {
			match = { path, resolver };
			break;
		}
	}

	const post = await match?.resolver?.();

	if (!post) {
		throw error(404);
	}

	return {
		component: post.default,
		frontmatter: post.metadata
	};
};
