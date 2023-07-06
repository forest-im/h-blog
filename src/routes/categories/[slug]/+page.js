import { allPosts, tags, categories } from "$lib/data/posts";
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
	const { slug } = params;
	const matchPosts = slug === "all" ? allPosts : allPosts.filter((post) => post.category === slug);

	if (!matchPosts.length) {
		throw error(404, "Post not found");
	}

	return {
		categories,
		posts: matchPosts,
		tags
	};
};
