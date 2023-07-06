<script>
	import { currentPage } from "$lib/store";
	import { DEFAULT_POSTS_COUNT, DEFAULT_PAGES_COUNT } from "$lib/constants/postDefaultValue";

	export let count;

	let pageArr = [];
	let endOfPage;

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
			on:click={() => currentPage.clickPage(page)}
			on:keydown={() => currentPage.clickPage(page)}
		>
			{#if page === $currentPage}
				<span class="text-pointColor-900">{page}</span>
			{:else}
				<span>{page}</span>
			{/if}
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
