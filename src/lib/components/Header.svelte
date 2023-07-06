<script>
	import clsx from "clsx";
	import profile02 from "$lib/images/profile02.png";
	import ToggleThemeInput from "$lib/components/ToggleThemeInput.svelte";
	import menu from "$lib/images/menu.png";
	import { isOpenMenu, theme, currentPage } from "$lib/store";
	import { page } from "$app/stores";

	let w;
</script>

<header
	class={"sticky top-0 z-10 my-3 flex justify-center bg-darkDefaultColor-900 dark:bg-defaultColor-900"}
	bind:clientWidth={w}
>
	<div class={clsx("flex w-full items-center justify-between font-light ")}>
		<div class="mx-5 flex w-full items-center justify-between">
			<div class="flex items-center">
				<a href="/" class="block">
					<img
						on:click={currentPage.reset}
						on:keydown={currentPage.reset}
						src={profile02}
						alt="profile"
						class="m-0 h-20 w-20 min-w-[5rem] shadow-none"
					/>
				</a>
			</div>
			<div class="flex h-full items-center gap-4">
				<ToggleThemeInput />
				<div class={clsx("cursor-pointer", $page.route.id.includes("categories") && "underline")}>
					<a href="/categories/all">POSTS</a>
				</div>
				<div
					class={clsx("cursor-pointer", $page.route.id.includes("tags") && "underline")}
					on:click={currentPage.reset}
					on:keydown={currentPage.reset}
				>
					<a href="/tags">TAGS</a>
				</div>
				<!-- <div class="cursor-pointer">
					<a
						href="/categories/til/til-2023"
						on:click={currentPage.reset}
						on:keydown={currentPage.reset}>TIL</a
					>
				</div> -->
				<div>
					<img
						on:click={isOpenMenu.toggle}
						on:keydown={isOpenMenu.toggle}
						class={clsx("h-5 w-5 cursor-pointer", $theme === "dark" && "invert")}
						src={menu}
						alt="menu-icon"
					/>
				</div>
			</div>
		</div>
	</div>
</header>
