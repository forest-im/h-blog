<script>
	import PageHead from '$lib/postLayoutComponents/PageHead.svelte';
	import PostTitle from '$lib/postLayoutComponents/PostTitle.svelte';
	import PostMeta from '$lib/postLayoutComponents/PostMeta.svelte';
	import PostDescription from '$lib/postLayoutComponents/PostDescription.svelte';

	export let data;
</script>

<PageHead />

<section>
	{#each data.props as { slug, title, description, category }}
		<PostTitle {slug} {title} {category} />
		<PostDescription {slug} {description} {category} />
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		/* justify-content: center;
		align-items: center; */
		flex: 0.6;
	}
</style>
