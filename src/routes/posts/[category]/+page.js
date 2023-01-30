// import { slugFromPath } from '$lib/slugFromPath';
// import { error } from '@sveltejs/kit';

// const slugFromPath = (path) => path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;

export const load = async () => {
	// const modules = import.meta.glob(`/src/posts/*/*.{md,svx,svelte.md}`);
	// console.log(params);

	// let match = {};

	// for (const [path, resolver] of Object.entries(modules)) {
	// 	if (slugFromPath(path) === params.slug) {
	// 		match = { path, resolver };
	// 		break;
	// 	}
	// }

	// const post = await match?.resolver?.();

	// if (!post) {
	// 	console.log(post);

	// 	throw error(404); // Couldn't resolve the post
	// }

	return {
		prop: 'test'
	};
};
