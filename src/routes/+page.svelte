<script>
	import { onMount } from "svelte/internal";
	import { currentToc, currentPage } from "$lib/store";
	import profile04 from "$lib/images/profile04.png";
	import Category from "$lib/components/Category.svelte";
	import { goto } from "$app/navigation";

	export let data;

	onMount(() => {
		currentPage.reset();
		currentToc.reset();

		goto("/categories/all?page=1");
	});
</script>

<Category categories={data.categories} postCount={data.postCount} />
