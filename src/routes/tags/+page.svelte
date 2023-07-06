<script>
	import TagList from "$lib/components/TagList.svelte";
	import ResponsiveLayer from "$lib/components/ResponsiveLayer.svelte";
	import Category from "$lib/components/Category.svelte";
	import { isOpenMenu } from "$lib/store/index.js";

	export let data;
</script>

{#if $isOpenMenu}
	<Category categories={data.categories} allPostsLength={data.posts.length} />
{/if}
<TagList tags={data.tags} />
