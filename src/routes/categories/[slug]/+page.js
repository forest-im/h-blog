import { Posts } from "$lib/data/posts";
import { error } from "@sveltejs/kit";

export const load = async (options) => {
	const { params, url } = options;
	const page = url.searchParams.get("pages");
	const { slug: category } = params;
	const posts = new Posts();
	const matchPosts = posts.getPosts(page, category);

	if (!matchPosts.length) {
		throw error(404, "Post not found");
	}

	return {
		categories: posts.getAllCategories(),
		posts: matchPosts,
		postCount: posts.getPostCount(category)
	};
};
