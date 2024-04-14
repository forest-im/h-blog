import { Posts } from "$lib/data/posts";
import { error } from "@sveltejs/kit";

export const load = async (options) => {
	const { params } = options;
	const { slug: tag } = params;
	const posts = new Posts();
	const matchPosts = posts.getAllPostsByTag(tag);

	if (!matchPosts.length) {
		error(404, "Post not found");
	}

	return {
		categories: posts.getAllCategories(),
		posts: matchPosts,
		postCount: posts.getAllPostsByTag(tag).length
	};
};
