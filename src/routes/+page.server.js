import { categories, tags, allPosts } from "$lib/data/posts";

export const load = async () => ({
	posts: allPosts,
	tags,
	categories
});
