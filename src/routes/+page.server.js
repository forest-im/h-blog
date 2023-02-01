import { count } from "../store";
import { posts, tags } from "$lib/data/posts";

let countValue;

count.subscribe((value) => (countValue = value));

export const load = async () => ({ posts: posts.slice(0, countValue), tags });
