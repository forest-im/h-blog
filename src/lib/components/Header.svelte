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
	class={"fixed top-0 z-30 mb-3 flex w-full max-w-[800px] justify-center bg-darkDefaultColor-900 dark:bg-defaultColor-900"}
	bind:clientWidth={w}
>
	<div class={clsx("flex w-full items-center justify-between font-light ")}>
		<div class="mx-5 flex w-full items-center justify-between">
			<a href="/" class="block">
				<div class="flex items-center">
					<img
						on:click={currentPage.reset}
						on:keydown={currentPage.reset}
						src={profile02}
						alt="profile"
						class="m-0 h-20 w-20 min-w-[5rem] shadow-none"
					/>
				</div>
			</a>
			<div class="flex h-full items-center gap-4">
				<ToggleThemeInput />
				<a href="/categories/all?pages=1">
					<div
						class={clsx(
							"cursor-pointer hover:text-pointColor-900",
							$page?.route?.id?.includes("categories") && "underline"
						)}
					>
						POSTS
					</div>
				</a>
				<a href="/tags">
					<div
						class={clsx(
							"cursor-pointer hover:text-pointColor-900",
							$page?.route?.id?.includes("tags") && "underline"
						)}
						on:click={currentPage.reset}
						on:keydown={currentPage.reset}
					>
						TAGS
					</div>
				</a>
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
