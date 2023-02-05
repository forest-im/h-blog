import { error } from "@sveltejs/kit";
import { getTilsInTheCurrentCategory } from "$lib/data/posts";

export const load = async ({ params }) => {
  const { category, slug } = params;
  const { tilsInTheCurrentCategory } = getTilsInTheCurrentCategory(category);

  const currentTil = tilsInTheCurrentCategory.filter((til) => til.slug === slug);

  if (!currentTil.length) {
    throw error(404, "Post not found");
  }

  return { currentTil };
};
