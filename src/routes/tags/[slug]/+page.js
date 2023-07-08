import { Posts } from "$lib/data/posts";
import { error } from "@sveltejs/kit";

export const load = async (options) => {
	const { params, url } = options;
	const page = url.searchParams.get("pages");
	const { slug: tag } = params;
	const posts = new Posts();
	const matchPosts = posts.getPostsByTag(page, tag);
	console.log({ page, matchPosts });

	if (!matchPosts.length) {
		throw error(404, "Post not found");
	}

	return {
		categories: posts.getAllCategories(),
		posts: matchPosts,
		postCount: posts.getAllPostsByTag(tag).length
	};
};
