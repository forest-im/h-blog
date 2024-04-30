<script>
	import { onMount } from "svelte";
	import { currentToc, noteCategories } from "$lib/store";
	import PostList from "$lib/components/PostList.svelte";

	export let data;

	onMount(() => {
		noteCategories.setCategory(data.categories);
		currentToc.reset();
	});
</script>

<PostList posts={data.posts} />
