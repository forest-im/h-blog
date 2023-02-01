<script>
	import PageHead from "$lib/components/PageHead.svelte";
	import PostTitle from "$lib/components/PostTitle.svelte";

	export let data;
	$: component = data.component;
</script>

<article>
	<PageHead title={data.metadata.title} description={data.metadata.description} />
	<PostTitle title={data.metadata.title} />

	<svelte:component this={component} />
</article>
