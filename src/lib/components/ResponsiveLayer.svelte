<script>
	import clsx from "clsx";
	import { isOpenMenu, displaySize, isOpenToc } from "$lib/store";
	import { afterUpdate, onMount } from "svelte";
	import { page } from "$app/stores";

	let screenWidth;

	afterUpdate(() => {
		if (!$page.params.fileName && $isOpenToc) {
			isOpenToc.toggle();
		}
	});

	$: if (screenWidth) {
		if (screenWidth <= 1110 && $displaySize === "desktop") {
			if ($isOpenToc) {
				isOpenToc.toggle();
			}
			displaySize.updateSize("tablet");
		}

		if (screenWidth > 1110 && $displaySize !== "desktop") {
			if (!$isOpenToc) {
				isOpenToc.toggle();
			}
			displaySize.updateSize("desktop");
		}
	}
</script>

<div
	bind:clientWidth={screenWidth}
	class={clsx(
		"flex min-h-screen w-full justify-center",
		$isOpenMenu && $displaySize !== "desktop" && "fixed right-0 top-0 overflow-hidden"
	)}
>
	<div class={clsx("w-[300px] flex-[0.5] max-[1100px]:hidden")} />
	<slot />
	<div
		class={clsx(
			"flex-[0.5] max-[1100px]:hidden",
			$isOpenMenu || $isOpenToc ? "min-w-[300px]" : "w-[300px]"
		)}
	/>
</div>
