import { allPosts, tags, categories } from "$lib/data/posts";
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
	const { slug } = params;
	const matchPosts = allPosts.filter((post) => {
		return post.tag.includes(slug);
	});

	if (!matchPosts.length) {
		throw error(404, "Post not found");
	}

	return {
		categories,
		posts: matchPosts,
		tags
	};
};
