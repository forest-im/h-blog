<script>
	import PostTitle from "$lib/components/PostTitle.svelte";
	import PostMeta from "$lib/components/PostMeta.svelte";
	import PostDescription from "$lib/components/PostDescription.svelte";
	import { page } from "$app/stores";
	import { currentPage } from "$lib/store";
	import { DEFAULT_POSTS_COUNT } from "$lib/constants/postDefaultValue";

	const getCurrentPosts = (posts, page) =>
		posts.slice(DEFAULT_POSTS_COUNT * (page - 1), page * DEFAULT_POSTS_COUNT);

	export let posts;
	let currentPosts = getCurrentPosts(posts, $currentPage);

	$: if ($currentPage) {
		currentPosts = getCurrentPosts(posts, $currentPage);
	}
</script>

<section class="min-h-[60vh]">
	<div class="m-8">
		<h1 class="text-4xl font-bold dark:text-white">
			{$page.params.slug === "all" ? "Recent Posts" : $page.params.slug} 🐣
		</h1>
		<span class="text-sm text-zinc-500">깊이 이해하기 위해 공부한 것을 정리하는 공간입니다. </span>
	</div>
	<hr />
	{#each currentPosts as { slug, title, date, description, category, tag }}
		<a href={slug && `/categories/${category}/${slug}`}>
			<div class="post-list-container">
				<div>
					<PostTitle {slug} {title} {category} />
					{#if description}
						<PostDescription {description} />
					{/if}
				</div>
				<div class="align-center flex flex-row items-start justify-between">
					<PostMeta tags={tag} {date} />
				</div>
			</div>
		</a>
	{/each}
</section>
