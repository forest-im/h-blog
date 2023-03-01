import { tilPosts, recentTils } from "$lib/data/posts";

export const load = async () => {
  // const modules = Object.entries(
  //   import.meta.glob(`/src/posts/*/*.{md,svx,svelte.md}`, { eager: true })
  // );

  // const recentTils = modules
  //   .sort((a, b) => {
  //     return (
  //       new Date(b[1].metadata.date).getTime() / 1000 -
  //       new Date(a[1].metadata.date).getTime() / 1000
  //     );
  //   })
  //   .slice(0, 5)
  //   .map((post) => post[1]);

  return { recentTils, posts: tilPosts };
};
