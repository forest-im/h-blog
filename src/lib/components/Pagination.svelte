<script>
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";
	import { currentPage } from "$lib/store";
	import { DEFAULT_POSTS_COUNT, DEFAULT_PAGES_COUNT } from "$lib/constants/postDefaultValue";
	import clsx from "clsx";

	export let count;

	let pageArr = [];
	let endOfPage;
	let slug = $page.params.slug;

	function getPageArr(allPosts, currentPage, defaultPostsCount, defaultPagesCount) {
		const currentPagesCount = Math.ceil(currentPage / defaultPagesCount);

		return Array.from({ length: defaultPagesCount }, () => 0)
			.map((_, i) => {
				const num =
					currentPagesCount === 1 ? i + 1 : (currentPagesCount - 1) * defaultPagesCount + i + 1;

				return endOfPage < num ? 0 : num;
			})
			.filter((p) => p !== 0);
	}

	$: if ($currentPage) {
		endOfPage = Math.ceil(count / DEFAULT_POSTS_COUNT);
		pageArr = getPageArr(count, $currentPage, DEFAULT_POSTS_COUNT, DEFAULT_PAGES_COUNT);

		if (browser) {
			$page.route.id === "/tags/[slug]"
				? goto(`/tags/${slug}?pages=${$currentPage}`)
				: goto(`/categories/${slug}?pages=${$currentPage}`);
		}
	}
</script>

<div class="my-10 flex justify-center">
	<div
		class="inline-flex w-10 cursor-pointer justify-center"
		on:click={currentPage.clickPrevMultiplePage}
		on:keydown={currentPage.clickPrevPage}
	>
		{#if DEFAULT_PAGES_COUNT < $currentPage}
			<span>{"<  "}</span>
		{/if}
	</div>
	{#each pageArr as page}
		<div
			class="inline-flex w-10 cursor-pointer justify-center"
			on:click={() => {
				currentPage.clickPage(page);
			}}
			on:keydown={() => {
				currentPage.clickPage(page);
			}}
		>
			<span class={clsx(page === $currentPage && "text-pointColor-900")}>{page}</span>
		</div>
	{/each}
	<div
		class="inline-flex w-10 cursor-pointer justify-center"
		on:click={() => currentPage.clickNextMultiplePage(count)}
		on:keydown={currentPage.clickNextPage}
	>
		{#if !pageArr.includes(endOfPage) && count > DEFAULT_POSTS_COUNT}
			<span>{"  >"}</span>
		{/if}
	</div>
</div>
