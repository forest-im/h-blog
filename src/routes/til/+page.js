import { tilPosts, recentTils } from "$lib/data/posts";

export const load = async () => {
	return { recentTils, posts: tilPosts };
};
