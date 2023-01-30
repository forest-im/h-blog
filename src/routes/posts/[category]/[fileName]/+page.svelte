<script>
	import PageHead from '$lib/postLayoutComponents/PageHead.svelte';
	import PostTitle from '$lib/postLayoutComponents/PostTitle.svelte';
	import PostMeta from '$lib/postLayoutComponents/PostMeta.svelte';
	export let data;
	// console.log(data);
	$: component = data.component;
</script>

<PageHead title={data.frontmatter.title} description={data.frontmatter.description} />
<PostTitle title={data.frontmatter.title} />
<!-- <PostMeta date={data.frontmatter.date} /> -->
<div>test</div>
<svelte:component this={component} />
