import { Posts } from "$lib/data/posts";

export const load = async () => {
	const posts = new Posts();

	return {
		postCount: posts.getPostCount(),
		tags: posts.getAllTags(),
		categories: posts.getAllCategories()
	};
};
