<script>
	import TilList from "$lib/components/TilList.svelte";
	import menu from "$lib/images/menu.png";
	import { isOpenMenu, isOpenModal } from "../../store";

	export let data;

	let w;

	function handleClickBg(e) {
		if (!$isOpenModal || w > 800 || e.target.nodeName === "IMG" || e.target.dataset.tilList) return;

		if ($isOpenModal && w < 801) {
			isOpenModal.closeModal();
		}
	}
</script>

<div
	class="relative"
	bind:clientWidth={w}
	on:click={(e) => handleClickBg(e)}
	on:keydown={handleClickBg}
>
	<div class="absolute">
		{#if $isOpenModal && w < 801}
			<div class="fixed top-[125px]">
				<TilList isModal={true} postsByCategory={data.postsByCategory} />
			</div>
		{/if}
	</div>
	{#if w > 800}
		<img
			on:click={isOpenMenu.toggle}
			on:keydown={isOpenMenu.toggle}
			class="sticky top-[125px] z-10 m-2 ml-0 block h-5 w-5 cursor-pointer"
			src={menu}
			alt="menu-icon"
		/>
	{:else}
		<img
			on:click={isOpenModal.toggle}
			on:keydown={isOpenModal.toggle}
			class="sticky top-[125px] z-10 m-2 ml-0 block h-5 w-5 cursor-pointer"
			src={menu}
			alt="menu-icon"
		/>
	{/if}
	<div class="flex w-full flex-row justify-center transition">
		{#if $isOpenMenu}
			<div class="max-[1100px]:min-w-[200px] max-[1100px]:max-w-[200px] max-lg:hidden">
				<TilList postsByCategory={data.postsByCategory} />
			</div>
		{/if}
		<slot />
	</div>
</div>
