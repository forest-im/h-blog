import { Posts } from "$lib/data/posts";

export const load = async () => {
	const posts = new Posts();

	return {
		categories: posts.getAllCategories(),
		postCount: posts.getPostCount()
	};
};
