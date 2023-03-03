import customizingDateFormat from "$lib/utils/customizingDateFormat.js";
import sortByRemovingDuplicates from "$lib/utils/sortByRemovingDuplicates";
import slugFromPath from "$lib/utils/slugFromPath";
import { dev } from "$app/environment";

const modules = Object.entries(
	import.meta.glob(`/src/posts/*/*.{md,svx,svelte.md}`, { eager: true })
);

export const allPosts = modules
	.filter(([, post]) => post.metadata?.published !== false || dev)
	.map(([path, post]) => {
		const splitPath = path.split("/");
		const dateObj = new Date(post.metadata.date);

		return {
			...post.metadata,
			tag: sortByRemovingDuplicates(post.metadata.tag.split(",").map((tag) => tag.trim())),
			slug: slugFromPath(path),
			category: splitPath[splitPath.length - 2],
			timeStamp: dateObj.getTime() / 1000,
			date: customizingDateFormat(dateObj),
			type: post.metadata.type
		};
	})
	.sort((a, b) => {
		return a.timeStamp < b.timeStamp ? 1 : -1;
	});

export const blogPosts = allPosts.filter((post) => post.type === "blog");

export const tilPosts = allPosts.filter((post) => post.type !== "blog");

export const tags = Object.entries(
	allPosts
		.reduce((allTagsArr, post) => {
			return [...allTagsArr, ...post.tag];
		}, [])
		.reduce((tagCountObj, tag) => {
			const trimTag = tag.trim();
			tagCountObj[trimTag] = tagCountObj[trimTag] + 1 || 1;

			return tagCountObj;
		}, {})
).sort((a, b) => b[1] - a[1]);

export const postsByCategory = Object.entries(
	tilPosts.reduce((allCategory, post) => {
		const { category } = post;

		const data = { title: post.title, slug: post.slug };

		if (allCategory[category]) {
			allCategory[category].push(data);
		} else {
			allCategory[category] = [data];
		}

		return allCategory;
	}, {})
).sort((a, b) => {
	if (a[0] > b[0]) return 1;
	if (a[0] === b[0]) return 0;
	if (a[0] < b[0]) return -1;
});

export const recentTils = modules
	.filter(([, post]) => post.metadata.type !== "blog")
	.sort((a, b) => {
		return (
			new Date(b[1].metadata.date).getTime() / 1000 - new Date(a[1].metadata.date).getTime() / 1000
		);
	})
	.slice(0, 5)
	.map((post) => post[1]);

export const getTilsInTheCurrentCategory = (category) => {
	const modules = Object.entries(
		import.meta.glob(`/src/posts/*/*.{md,svx,svelte.md}`, { eager: true })
	);

	const tilsInTheCurrentCategory = modules
		.filter(([path, post]) => {
			const splitPath = path.split("/");
			const tilCategory = splitPath[splitPath.length - 2];

			return tilCategory === category && post.metadata.type !== "blog";
		})
		.sort((a, b) => {
			return (
				new Date(b[1].metadata.date).getTime() / 1000 -
				new Date(a[1].metadata.date).getTime() / 1000
			);
		})
		.map((post) => {
			const [path, module] = post;

			return { slug: slugFromPath(path), ...module };
		});

	return { tilsInTheCurrentCategory };
};
