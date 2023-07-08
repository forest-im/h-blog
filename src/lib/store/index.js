import { writable } from "svelte/store";
import { DEFAULT_PAGES_COUNT, DEFAULT_POSTS_COUNT } from "$lib/constants/postDefaultValue";

export const currentPage = (() => {
	const { subscribe, set, update } = writable(1);

	return {
		subscribe,
		clickPrevMultiplePage: () =>
			update((page) => {
				const p = page - DEFAULT_POSTS_COUNT;

				return p < 1 ? 1 : p;
			}),
		clickNextMultiplePage: (allPosts) =>
			update((page) => {
				const p = page + DEFAULT_PAGES_COUNT;
				const max = Math.ceil(allPosts / DEFAULT_POSTS_COUNT) - 1;

				return p > max ? max : p;
			}),
		clickPrevPage: () => update((page) => page - 1),
		clickNextPage: () => update((page) => page + 1),
		clickPage: (currentPage) => update(() => currentPage),
		clickEndPage: (allPosts) => update(() => Math.ceil(allPosts / DEFAULT_POSTS_COUNT) - 1),
		reset: () => set(1)
	};
})();

export const theme = (() => {
	const { subscribe, set, update } = writable("light");

	return {
		subscribe,
		changeTheme: (theme) => update(() => theme),
		reset: () => set(DEFAULT_POSTS_COUNT)
	};
})();

export const count = (() => {
	const { subscribe, set, update } = writable(DEFAULT_POSTS_COUNT);

	return {
		subscribe,
		increment: () => update((postsCount) => postsCount + DEFAULT_POSTS_COUNT),
		reset: () => set(DEFAULT_POSTS_COUNT)
	};
})();

export const isOpenMenu = (() => {
	const { subscribe, update } = writable(false);

	return {
		subscribe,
		toggle: () => update((val) => !val)
	};
})();

export const displaySize = (() => {
	const { subscribe, update } = writable("desktop");

	return {
		subscribe,
		updateSize: (size) => update(() => size)
	};
})();

export const isOpenToc = (() => {
	const { subscribe, update } = writable(false);

	return {
		subscribe,
		toggle: () => update((val) => !val)
	};
})();

export const currentToc = (() => {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		addToc: (toc) => update(() => toc),
		reset: () => set([])
	};
})();
