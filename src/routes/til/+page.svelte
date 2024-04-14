<script>
	import { onMount } from "svelte";
	import { currentToc, noteCategories } from "$lib/store";
	import MainLayout from "$lib/components/MainLayout.svelte";
	import HomeBackground from "$lib/components/HomeBackground.svelte";
	import HomeSubLayout from "$lib/components/HomeSubLayout.svelte";
	import PostList from "$lib/components/PostList.svelte";

	export let data;

	onMount(() => {
		noteCategories.setCategory(data.categories);
		currentToc.reset();
	});
</script>

<PostList posts={data.posts} />
<!-- <HomeSubLayout bgBlur={true}>
</HomeSubLayout> -->
<!-- <HomeBackground hasBlur={true} /> -->
