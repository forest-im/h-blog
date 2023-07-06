import { categories, allPosts } from "$lib/data/posts";

export const load = async () => ({
	posts: allPosts,
	categories
});
