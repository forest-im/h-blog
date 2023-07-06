<script>
	import clsx from "clsx";
	import { isOpenMenu, displaySize } from "$lib/store";
	import { page } from "$app/stores";

	export let categories;
	export let postsCount;
</script>

{#if $displaySize !== "desktop" && $isOpenMenu}
	<div
		class="category fixed left-0 top-0 z-50 h-screen w-screen bg-pointColor-800 opacity-10"
		on:click={isOpenMenu.toggle}
		on:keydown={isOpenMenu.toggle}
	/>
{/if}
<aside
	class={clsx(
		"category prose-sm fixed bottom-0 right-0 top-0 z-50 flex h-full w-[300px] translate-x-full flex-col justify-between overflow-y-auto border-l-[1px] bg-pointColor-500 pt-0",
		$isOpenMenu && "active_category"
	)}
>
	<ul class="list-none leading-8">
		<li class="cursor-pointer">
			<a href={`/`}>
				<span class="hover:font-bold">전체 보기</span>
			</a>
			<span class="text-neutral-500">({postsCount})</span>
		</li>
		{#each categories as [category, posts]}
			<li class="cursor-pointer">
				<a href={`/categories/${category}`} class="font-normal">
					<span
						class={clsx(
							"m-0",
							$page.params.slug === category ? "font-bold text-pointColor-900" : "hover:font-bold"
						)}
						>{category}
					</span><span class="text-neutral-500">({posts.length})</span>
				</a>
			</li>
		{/each}
	</ul>
</aside>
