<script>
	import { page } from "$app/stores";
	import clsx from "clsx";
	import { onMount } from "svelte";
	import HomeCategory from "./HomeCategory.svelte";
	import HomeBackground from "$lib/components/HomeBackground.svelte";
	import Header from "$lib/components/Header.svelte";
	import { isOpenMenu, theme } from "$lib/store";
	import { browser } from "$app/environment";

	$: userAgent = browser ? window?.navigator.userAgent.toLowerCase() : "";
	$: isIOS = /iphone|ipod/g.test(userAgent) && userAgent.indexOf("mobile") > -1;
	$: isAndroid = userAgent.indexOf("mobile") && !isIOS;

	const handleResize = () => {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	};

	onMount(async () => {
		if (isAndroid) {
			handleResize();
			window.addEventListener("resize", handleResize);
		}
	});
</script>

<div class="wrapper relative left-0 top-0 w-full overflow-hidden">
	<div class={clsx("z-50 overflow-hidden", $theme === "dark" ? "vignetting" : "")} />
	<HomeBackground />
	<div
		class={clsx(
			"pointer-events-none z-40 overflow-hidden",
			!$page.route?.id?.includes("til") && !$page.route?.id?.includes("review") && "noise"
		)}
	/>
	<div
		class="container-absolute relative bottom-0 left-0 right-0 top-0 z-50 box-border h-full overflow-hidden px-10 py-7 pr-7 max-[500px]:p-3"
	>
		<div class="flex h-full flex-col py-2 pr-3 max-[500px]:py-0 max-[500px]:pr-0">
			<Header />
			<!-- Content -->
			<div class="relative flex h-full flex-1 gap-10 overflow-hidden">
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
		height: 100vh;
		max-height: 100%;
		max-height: calc(var(--vh, 1vh) * 100);
		max-height: -moz-available;
		max-height: -webkit-fill-available;
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
