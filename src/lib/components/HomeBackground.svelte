<script>
	import clsx from "clsx";
	import { page } from "$app/stores";

	import { theme } from "$lib/store";

	export let hasBlur;
</script>

<div class={clsx("absolute bottom-0 left-0 right-0 top-0 z-40 bg-black")}>
	<div
		class={clsx(
			"absolute left-1/2 top-1/2 z-40 h-[calc(100%-3rem)] w-[calc(100%-3rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-[0.3px] border-gray-300 max-[500px]:hidden"
		)}
	/>
	<!-- <div class="absolute bottom-12 right-12 z-[99] max-[500px]:bottom-9 max-[500px]:right-8" /> -->
	<div
		class={clsx(
			"absolute left-1/2 top-1/2 z-10 h-[calc(100%-3rem)] w-[calc(100%-3rem)] -translate-x-1/2 -translate-y-1/2 transform bg-cover bg-center max-[500px]:h-[calc(100%-1rem)] max-[500px]:w-[calc(100%-1rem)]",
			$page.route?.id !== "/" && "blur-3xl",
			$theme === "dark" ? "bg-me brightness-[50%]" : "bg-sky"
		)}
	/>
	<div
		class={clsx(
			"left-0 top-0 h-screen w-full bg-black bg-cover bg-center",
			$theme === "dark" ? "bg-me brightness-[40%]" : "bg-sky",
			$page.route?.id === "/" ? "blur-sm" : "blur-3xl"
		)}
	/>
</div>
