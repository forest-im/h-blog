import { posts, tags } from "$lib/data/posts";
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
  const { slug } = params;

  const matchPosts = posts.filter((post) => {
    return post.tag.includes(slug);
  });

  if (!matchPosts.length) {
    throw error(404, "Post not found");
  }

  return {
    posts: matchPosts,
    tags
  };
};
