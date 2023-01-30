const slugFromPath = (path) => path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;

const MAX_POSTS = 10;

export const load = async () => {
	const modules = import.meta.glob(`/src/posts/*/*.{md,svx,svelte.md}`);
	const modulesArr = Object.entries(modules);

	const postPromises = modulesArr.map(([path, resolver]) =>
		resolver()
			.then((post) => {
				const splitPath = path.split('/');

				return {
					slug: slugFromPath(path),
					category: splitPath[splitPath.length - 2],
					...post.metadata
				};
			})
			.catch((err) => console.log(err))
	);

	const posts = await Promise.all(postPromises);

	const publishedPosts = posts
		.slice(0, MAX_POSTS)
		.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return { props: publishedPosts };
};
