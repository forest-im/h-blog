import { error } from "@sveltejs/kit";
import { getTilsInTheCurrentCategory } from "$lib/data/posts";

export const load = async ({ params }) => {
  const { category } = params;

  if (!category) {
    throw error(404, "Post not found");
  }

  return getTilsInTheCurrentCategory(category);
};
