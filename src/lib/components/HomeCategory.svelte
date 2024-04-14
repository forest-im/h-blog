<script>
	import { page } from "$app/stores";
	import clsx from "clsx";
	import { isOpenMenu, noteCategories, activeNoteCategory } from "$lib/store";
	import { HOME_CATEGORIES } from "$lib/constants/metadata";

	const clickTilCategory = (category) => {
		activeNoteCategory.toggleCategory(category);
	};
</script>

<div
	class={clsx(
		"flex min-w-64 max-w-64 flex-col font-normal leading-8 max-[750px]:hidden max-[500px]:text-sm"
	)}
>
	<ul>
		{#each HOME_CATEGORIES as category}
			<li class="hover:underline">
				<a href={category.link}><li class="cursor-pointer">{category.name}</li></a>
			</li>
		{/each}
	</ul>

	{#if $page.route?.id.includes("til") && $noteCategories?.length}
		<div class="divider">TIL Category</div>
		<ul class="h-full overflow-y-scroll">
			{#each $noteCategories as category}
				<li>
					<div
						class="flex cursor-pointer items-center pr-3"
						on:click={clickTilCategory(category.name)}
						on:keydown={clickTilCategory(category.name)}
						role="button"
						tabindex="0"
					>
						<span>
							<svg
								rpl=""
								fill="currentColor"
								height="20"
								icon-name="caret-down-outline"
								viewBox="0 0 20 20"
								width="20"
								xmlns="http://www.w3.org/2000/svg"
								transform={$activeNoteCategory?.includes(category.name)
									? "rotate(0)"
									: "rotate(-90)"}
								class="duration-200 ease-out"
							>
								<path
									d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"
								></path>
							</svg></span
						>
						<span>{category.name}</span>
					</div>
					{#if $activeNoteCategory.includes(category.name)}
						<ul class="">
							{#each category.posts as post}
								<a href={`/til/categories/${category.name}/${post.slug}`}
									><li
										class={clsx(
											"ml-[9px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap border-l border-secondary pl-5",
											$page.route?.id?.includes(post?.slug) && "border-secondary-content"
										)}
									>
										{post?.title}
									</li></a
								>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<ul
	class={clsx(
		"absolute left-0 right-0 h-full w-full bg-primary min-[750px]:hidden",
		$isOpenMenu ? "block" : "hidden"
	)}
>
	{#each HOME_CATEGORIES as homeCategory}
		<a href={homeCategory.link}><li class="cursor-pointer">{homeCategory.name}</li></a>
	{/each}
</ul>
