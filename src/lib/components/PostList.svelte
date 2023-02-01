<script>
	import PostTitle from "$lib/components/PostTitle.svelte";
	import PostMeta from "$lib/components/PostMeta.svelte";
	import PostDescription from "$lib/components/PostDescription.svelte";

	export let posts;
</script>

<section class="flex flex-col">
	{#each posts as { slug, title, date, description, category, tag }}
		<a href={slug && `/posts/${category}/${slug}`}>
			<div class="post-list-container">
				<div>
					<PostTitle {slug} {title} {category} />
					<PostDescription {description} />
				</div>
				<div class="align-center flex flex-row items-start justify-between">
					<PostMeta tags={tag} {date} />
				</div>
			</div>
		</a>
	{/each}
</section>
