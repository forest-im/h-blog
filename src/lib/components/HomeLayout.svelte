<script>
	import { page } from "$app/stores";
	import clsx from "clsx";
	import githubIcon from "$lib/icons/github-mark-white.png";
	import HomeCategory from "./HomeCategory.svelte";
	import HomeBackground from "$lib/components/HomeBackground.svelte";
	import ToggleThemeInput from "$lib/components/ToggleThemeInput.svelte";
	import { isOpenMenu, theme } from "$lib/store";
	import { afterNavigate } from "$app/navigation";
</script>

<div class="relative left-0 top-0 h-screen w-full overflow-hidden">
	<div class={clsx("z-50", $theme === "dark" ? "vignetting" : "")} />
	{#if $theme === "dark"}
		<HomeBackground />
	{/if}
	<!-- <div class="top-effect z-40" /> -->
	<div class="noise pointer-events-none z-40 border border-white" />
	<div
		class="container-absolute relative bottom-0 left-0 right-0 top-0 z-50 box-border h-full overflow-auto px-10 py-7 pr-7 max-[500px]:p-3"
	>
		<div class="wrapper flex flex-col py-2 pr-3 max-[500px]:py-0 max-[500px]:pr-0">
			<!-- Header -->
			<div>
				<div class="flex justify-between">
					<div class="w-full">
						<div class="flex w-full items-center justify-between">
							<div class="flex gap-3">
								<!-- 메뉴 아이콘 -->
								<label id="menu-icon" class="swap swap-rotate min-[750px]:hidden">
									<!-- this hidden checkbox controls the state -->
									<input id="menu-icon" type="checkbox" on:change={isOpenMenu.toggle} />

									<!-- hamburger icon -->
									{#if !$isOpenMenu}
										<svg
											class="fill-current"
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											viewBox="0 0 512 512"
											><path
												d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"
											/></svg
										>
									{:else}
										<!-- close icon -->
										<svg
											class="fill-current"
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											viewBox="0 0 512 512"
											><polygon
												points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
											/></svg
										>
									{/if}
								</label>
								<div class="flex flex-col">
									<a href="/">
										<p class="text-5xl font-thin max-[750px]:text-2xl max-[750px]:font-light">
											Hyunjung Im
										</p>
									</a>
									<p class="pt-2 text-sm font-thin max-[750px]:hidden">Frontend Developer</p>
								</div>
							</div>
							<div
								class="flex -translate-y-1 transform items-center justify-center gap-3 max-[500px]:translate-y-[1.4]"
							>
								<ToggleThemeInput />
								<a class="z-[50] cursor-pointer" href="https://github.com/forest-im" target="_blank"
									><img
										class={clsx(
											"m-0 h-8 w-8 max-[500px]:h-7 max-[500px]:w-7",
											$theme === "light" && "invert"
										)}
										src={githubIcon}
										alt="github"
										width="32px"
									/></a
								>
							</div>
						</div>
					</div>
				</div>
				<div class={clsx("divider max-[750px]:my-0", $page.route?.id === "/" && "invisible")} />
			</div>
			<!-- Content -->
			<div class="relative flex flex-1 gap-10 overflow-hidden">
				<HomeCategory />
				{#if !$isOpenMenu}
					<slot />
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.container-absolute {
		& * {
			box-sizing: border-box;
		}
	}

	.wrapper {
		height: fill-available;
		height: -webkit-fill-available;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.resume {
		-webkit-filter: opacity(0.5) drop-shadow(0 0 0 #1f1f1f);
		filter: opacity(0.5) drop-shadow(0 0 0 #1f1f1f);
	}

	.vignetting {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-shadow: 0 0 200px rgba(0, 0, 0, 0.9) inset;
	}

	.top-effect {
		position: absolute;
		left: 10%;
		top: 20%;
		width: 100%;
		height: 100%;
		background: linear-gradient(10deg, #ffffff, #c5c4c8);
		border-radius: 62% 47% 82% 35% / 45% 45% 80% 66%;
		will-change: border-radius, transform, opacity, filter;
		animation: sliderShape 3s linear infinite;
		mix-blend-mode: color-dodge;
		filter: brightness(1.2);
		filter: blur(100px);
		opacity: 15%;
	}

	@keyframes sliderShape {
		0%,
		100% {
			border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
			transform: translate3d(0, 0, 0) rotate(20deg) rotateZ(0.01deg);
		}
		87% {
			border-radius: 80% 60% 60% 100% / 100% 100% 60% 60%;
			transform: translate3d(0, 20px, 100px, 0) rotate(20deg) rotateZ(0.01deg);
		}
		67% {
			border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;
			transform: translate3d(0, 30px, 0) rotate(20deg) rotateZ(0.01deg);
		}
		50% {
			transform: translate3d(0, 20px, 0) rotate(20deg) rotateZ(0.01deg);
		}
		34% {
			border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%;
			transform: translate3d(0, 10px, 0) rotate(20deg) rotateZ(0.01deg);
		}
	}

	.noise {
		position: fixed;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		width: 200%;
		height: 200vh;
		background: transparent url("http://assets.iceable.com/img/noise-transparent.png") repeat 0 0;
		background-repeat: repeat;
		animation: bg-animation 0.2s infinite;
		opacity: 0.9;
		visibility: visible;
	}

	@keyframes bg-animation {
		0% {
			transform: translate(0, 0);
		}
		10% {
			transform: translate(-5%, -5%);
		}
		20% {
			transform: translate(-10%, 5%);
		}
		30% {
			transform: translate(5%, -10%);
		}
		40% {
			transform: translate(-5%, 15%);
		}
		50% {
			transform: translate(-10%, 5%);
		}
		60% {
			transform: translate(15%, 0);
		}
		70% {
			transform: translate(0, 10%);
		}
		80% {
			transform: translate(-15%, 0);
		}
		90% {
			transform: translate(10%, 5%);
		}
		100% {
			transform: translate(5%, 0);
		}
	}
</style>
