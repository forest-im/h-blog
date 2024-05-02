import { Posts } from "$lib/data/posts";
import { error } from "@sveltejs/kit";

export const load = async (options) => {
	const { params } = options;
	const { slug: category } = params;
	const posts = new Posts();
	const matchPosts = posts.getAllPosts(category);

	if (!matchPosts.length) {
		error(404, "Post not found");
	}

	return {
		categories: posts.getAllCategories(),
		posts: matchPosts,
		postCount: posts.getPostCount(category)
	};
};
