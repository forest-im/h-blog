import { count } from "../store";
import { blogPosts, tags } from "$lib/data/posts";

let countValue;

count.subscribe((value) => (countValue = value));

export const load = async () => ({ posts: blogPosts.slice(0, countValue), tags });
