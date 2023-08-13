<script>
	import clsx from "clsx";

	export let hasBlur;
</script>

<div
	class={clsx(
		"absolute left-1/2 top-1/2 z-10 h-[calc(100%-3rem)] w-[calc(100%-3rem)] -translate-x-1/2 -translate-y-1/2 transform border-white bg-me bg-cover bg-center brightness-[50%]",
		hasBlur && "blur-md"
	)}
/>
<div
	class="relative left-0 top-0 h-screen w-full bg-black bg-me bg-cover bg-center blur-sm brightness-[40%]"
/>
