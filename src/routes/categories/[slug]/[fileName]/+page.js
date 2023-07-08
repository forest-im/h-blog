import { error } from "@sveltejs/kit";
import slugFromPath from "$lib/utils/slugFromPath";
import { Posts } from "$lib/data/posts";

export const load = async ({ params }) => {
	const { fileName } = params;
	const posts = new Posts();

	for (const [path, resolver] of posts.modules) {
		if (slugFromPath(path) === fileName) {
			const { metadata, default: component } = resolver;

			return {
				component,
				metadata,
				categories: posts.getAllCategories(),
				postsCount: posts.getPostCount()
			};
		}
	}

	throw error(404, "Post not found");
};
