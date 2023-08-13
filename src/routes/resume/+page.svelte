<script>
	import { onMount } from "svelte";
	import HomeSubLayout from "$lib/components/HomeSubLayout.svelte";
	import HomeBackground from "$lib/components/HomeBackground.svelte";

	export let data;
</script>

<HomeSubLayout bgBlur={true}>
	<!-- <div class="flex h-full w-full items-center justify-center bg-red-300"> -->
	<div class="center w-full">
		<iframe
			class="w-[800px] pb-20 max-[800px]:w-full"
			height="100%"
			src="https://docs.google.com/document/d/e/2PACX-1vTUAVJ3tn_XIMMzD9Mavdq3a2pkmpKCk2ehA0W2kEJo5HKWJUcxckBc1oPgtF9bnUQ_gFekFHAwiCZ2/pub?embedded=true"
			allowfullscreen
		/>
	</div>
</HomeSubLayout>
<HomeBackground hasBlur={true} />

<style>
	.center iframe {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
