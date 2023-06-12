<script>
	import clsx from "clsx";
	import TilList from "$lib/components/TilList.svelte";
	import menu from "$lib/images/menu.png";
	import { isOpenMenu, isOpenModal, theme } from "../../store";

	export let data;

	let w;

	function handleClickBg(e) {
		if ($isOpenModal && w < 801) {
			console.log("hi");
			isOpenModal.closeModal();
		}

		if (!$isOpenModal || w > 800 || e.target.nodeName === "IMG" || e.target.dataset.tilList) return;
	}
</script>

<div
	class="relative"
	bind:clientWidth={w}
	on:click={(e) => handleClickBg(e)}
	on:keydown={handleClickBg}
>
	<div class="absolute">
		{#if w < 801}
			<div class="fixed top-[125] z-50 ml-10">
				{#if $isOpenModal && w < 801}
					<TilList isModal={true} postsByCategory={data.postsByCategory} />
				{/if}
			</div>
		{/if}
	</div>
</div>

<div class="flex justify-center transition">
	<div
		class={clsx(
			"not-prose max-[1100px]:max-w-[200px] max-[800px]:hidden",
			$isOpenMenu ? "max-[1100px]:min-w-[200px]" : ""
		)}
	>
		<img
			on:click={isOpenMenu.toggle}
			on:keydown={isOpenMenu.toggle}
			class={clsx(
				"sticky top-[125px] z-10 m-1 mb-4 block h-5 w-5 cursor-pointer max-[800px]:hidden",
				$theme === "dark" && "invert",
				$isOpenMenu && "mr-5"
			)}
			src={menu}
			alt="menu-icon"
		/>
		{#if $isOpenMenu}
			<TilList isModal={false} postsByCategory={data.postsByCategory} />
		{/if}
	</div>
	<slot />
</div>
