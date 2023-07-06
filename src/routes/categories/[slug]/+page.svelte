<script>
	import { onMount } from "svelte";
	import { currentToc } from "$lib/store/index.js";
	import MainLayout from "$lib/components/MainLayout.svelte";

	export let data;

	onMount(() => {
		currentToc.reset();
	});
</script>

<MainLayout {data} />
