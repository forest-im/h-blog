<script>
	import clsx from "clsx";
	import { page } from "$app/stores";
	import profile02 from "$lib/images/profile02.png";
	import Entry from "$lib/components/Entry.svelte";
	import ToggleThemeInput from "$lib/components/ToggleThemeInput.svelte";
	import menu from "$lib/images/menu.png";

	import { isOpenModal, theme } from "../../store";

	let w;
</script>

<header
	class={"sticky top-0 z-50 flex w-full justify-center bg-darkDefaultColor-900 dark:bg-defaultColor-900"}
	bind:clientWidth={w}
>
	<nav
		class="w-[800px] min-w-[300px] max-w-[800px] px-4 pt-4 text-defaultColor-700 max-[400px]:px-0"
	>
		<div class={clsx("flex w-full items-center justify-between font-light max-sm:flex-col")}>
			<div class="mx-5 flex w-full items-center">
				<div>
					<a href="/">
						<img
							src={profile02}
							alt="profile"
							class="m-0 mb-5 mr-5 h-20 w-20 min-w-[5rem] shadow-none max-[400px]:mr-1"
						/>
					</a>
				</div>
				<Entry entry="/" name="Blog" />
				<Entry entry="/projects" name="Projects" />
				{#if w < 801 && $page.route.id.includes("til")}
					<img
						on:click={isOpenModal.toggle}
						on:keydown={isOpenModal.toggle}
						class={clsx("h-5 w-5 cursor-pointer", $theme === "dark" && "invert")}
						src={menu}
						alt="menu-icon"
					/>
				{/if}
				<div class="flex w-full justify-end">
					<ToggleThemeInput />
				</div>
			</div>
		</div>
	</nav>
</header>
