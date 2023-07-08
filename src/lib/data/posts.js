import { dev } from "$app/environment";
import customizingDateFormat from "$lib/utils/customizingDateFormat.js";
import sortByRemovingDuplicates from "$lib/utils/sortByRemovingDuplicates";
import slugFromPath from "$lib/utils/slugFromPath";
import { DEFAULT_POSTS_COUNT } from "$lib/constants/postDefaultValue";

export class Posts {
	constructor() {
		this.allModules = Object.entries(
			import.meta.glob(`/src/posts/*/*.{md,svx,svelte.md}`, { eager: true })
		).filter(([, post]) => post.metadata?.published !== false || dev);
		this.modules = this.allModules;
		this.allPostCount = this.modules.length;
		this.posts = null;
	}

	filterModulesByCategory(category = "all") {
		this.modules = this.modules.filter(([path]) => {
			const splitPath = path.split("/");
			const currentCategory = splitPath[splitPath.length - 2];

			return category === "all" || category === currentCategory;
		});

		return this;
	}

	sliceModules(page = 1) {
		this.modules = this.modules.slice(DEFAULT_POSTS_COUNT * (page - 1), page * DEFAULT_POSTS_COUNT);

		return this;
	}

	getPostCount(category = "all") {
		return category === "all"
			? this.allPostCount
			: this.filterModulesByCategory(category).modules.length;
	}

	getFormatPosts() {
		return this.modules.map(([path, post]) => {
			const splitPath = path.split("/");
			const category = splitPath[splitPath.length - 2];
			const dateObj = new Date(post.metadata?.date);

			return {
				...post.metadata,
				tag: sortByRemovingDuplicates(post.metadata.tag.split(",").map((tag) => tag.trim())),
				slug: slugFromPath(path),
				category,
				timeStamp: dateObj.getTime() / 1000,
				date: customizingDateFormat(dateObj),
				type: post.metadata.type
			};
		});
	}

	getAllPosts(category) {
		return this.filterModulesByCategory(category)
			.getFormatPosts()
			.sort((a, b) => b.date.localeCompare(a.date));
	}

	getPosts(page = 1, category = "all") {
		return this.filterModulesByCategory(category)
			.sliceModules(page)
			.getFormatPosts()
			.sort((a, b) => b.date.localeCompare(a.date));
	}

	getAllPostsByTag(tag) {
		return this.getAllPosts().filter((post) => post.tag.includes(tag));
	}

	getPostsByTag(page = 1, tag) {
		return this.getAllPostsByTag(tag).slice(
			DEFAULT_POSTS_COUNT * (page - 1),
			page * DEFAULT_POSTS_COUNT
		);
	}

	getAllTags() {
		{
			return Object.entries(
				this.modules
					.reduce((acc, [, post]) => {
						const tags = post.metadata.tag.split(",");

						return [...acc, ...tags];
					}, [])
					.reduce((acc, cur) => {
						acc[cur.trim()] = acc[cur.trim()] + 1 || 1;

						return acc;
					}, {})
			)
				.map(([tags, nums]) => ({ name: tags, count: nums }))
				.sort((a, b) => b.count - a.count);
		}
	}

	getAllCategories() {
		return Object.entries(
			this.allModules.reduce((acc, [path]) => {
				const splitPath = path.split("/");
				const category = splitPath[splitPath.length - 2];
				acc[category] = acc[category] + 1 || 1;

				return acc;
			}, {})
		).map(([category, nums]) => ({ name: category, count: nums }));
	}
}
