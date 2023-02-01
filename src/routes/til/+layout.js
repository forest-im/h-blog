import { postsByCategory } from "$lib/data/posts";

export const prerender = true;

export const load = async () => ({ postsByCategory });
