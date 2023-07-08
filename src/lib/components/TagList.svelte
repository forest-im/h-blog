<script>
	import clsx from "clsx";
	import { page } from "$app/stores";

	export let tags;
	const TAG_COUNT_LIMIT = 100;

	$: tagCountLimit = TAG_COUNT_LIMIT;

	function handleClicktagCountLimit() {
		tagCountLimit = tagCountLimit === TAG_COUNT_LIMIT ? tags.length : TAG_COUNT_LIMIT;
	}
</script>

<div class="box-border min-h-[75vh] max-w-[800px]">
	<div class="m-8">
		<h1 class="text-4xl font-bold dark:text-white">
			Tags <span class="text-pointInvertColor">#</span>
		</h1>
	</div>
	<div class="flex flex-col items-center justify-center">
		<div class="m-4 mb-0 flex flex-wrap overflow-auto whitespace-nowrap p-4">
			{#each tags.slice(0, tagCountLimit) as tag}
				<a href={`/tags/${tag.name}?pages=1`}>
					<div
						class={clsx(
							"tag-container dark:border-gray",
							$page.params.slug === tag.name && "bg-pointInvertColor dark:text-defaultColor-800"
						)}
					>
						#{tag.name}
						<span class="text-defaultColor-700 dark:text-darkDefaultColor-700">{tag.count}</span>
					</div>
				</a>
			{/each}
		</div>
		{#if tags.length > TAG_COUNT_LIMIT}
			<div
				class="mb-3 cursor-pointer text-xs text-defaultColor-700 hover:text-pointColor-900"
				on:click={handleClicktagCountLimit}
				on:keydown={handleClicktagCountLimit}
			>
				{tagCountLimit === TAG_COUNT_LIMIT ? "전체 태그 보기" : "접기"}
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.tag-container {
		@apply mb-1 ml-0 mr-2 mt-2 cursor-pointer rounded-xl border-[1px] border-solid border-darkDefaultColor-700 px-[0.5rem] py-[0.2rem] text-xs  hover:bg-pointInvertColor hover:text-defaultColor-800;
	}
</style>
