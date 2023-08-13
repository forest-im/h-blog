<script>
	import { page } from "$app/stores";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import ResponsiveLayer from "$lib/components/ResponsiveLayer.svelte";
	import clsx from "clsx";
	import githubIcon from "$lib/icons/github-mark-white.png";

	import "../app.css";
	import "../prism.css";
</script>

<body>
	{#if ($page.route.id && $page.route.id.includes("/categories")) || $page.route.id.includes("/tags")}
		<div class="mx-auto flex min-h-[101vh] w-screen min-w-[350px] flex-col justify-center">
			<main class="relative flex flex-1 flex-col">
				<ResponsiveLayer>
					<div class="max-w-[800px] max-[800px]:w-full min-[800px]:min-w-[800px]">
						<Header />
						<div class="min-h-[80px]" />
						<div
							on:click={() => window && window.scrollTo(0, 0)}
							on:keydown={() => window && window.scrollTo(0, 0)}
							class="fixed bottom-8 right-8 z-40 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-300 opacity-90 shadow-md"
						>
							↑
						</div>
						<slot />
						<Footer />
					</div>
				</ResponsiveLayer>
			</main>
		</div>
	{:else}
		<div class="relative left-0 top-0 h-screen w-full overflow-hidden bg-black">
			<div class="vignetting z-30" />
			<div class="top-effect z-30" />
			<div class="noise pointer-events-none z-50" />
			<div
				class="absolute left-1/2 top-1/2 z-40 h-[calc(100%-3rem)] w-[calc(100%-3rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-[0.3px] border-gray-300"
			>
				<div class="h-full w-full p-5 text-white max-[500px]:p-2">
					<div class="flex justify-between">
						<div class="w-full">
							<div class="flex w-full items-center justify-between">
								<p class="text-6xl font-thin text-white max-[500px]:text-3xl">Hyunjung Im</p>
								<div>
									<a href="https://github.com/h-alex2" target="_blank"
										><img class="m-0 h-8 w-8" src={githubIcon} alt="github" width="32px" /></a
									>
								</div>
							</div>
							<p class="pt-2 font-thin text-white">Frontend Developer</p>
						</div>
					</div>
					<ul
						class="absolute z-50 w-fit pt-10 font-normal leading-8 max-[1100px]:flex max-[1100px]:gap-3 max-[1100px]:pt-1 max-[500px]:text-sm"
					>
						<a href="/"><li class="cursor-pointer">Home</li></a>
						<a href="/blog/categories/all?page=1"><li class="cursor-pointer">Blog</li></a>
						<a href="/projects"><li class="cursor-pointer">Projects</li></a>
						<a href="/photos"><li class="cursor-pointer">Photos</li></a>
						<a href="/contact"><li class="cursor-pointer">Contact</li></a>
					</ul>
				</div>
				{#if $page && $page.route.id === "/"}
					<div class="absolute bottom-0 right-0 p-5">
						<div class="flex max-w-[200px] flex-col text-sm font-normal text-white">
							<p>
								기존의 사고 방식을 전환하는 것을 좋아합니다. 요새는 함수형 프로그래밍에 빠져 생각을
								확장시키고 있습니다.
							</p>
							<p class="pt-2">
								개발 외 시간에는 카메라와 함께 산책을 하거나 책을 읽습니다. 프레임안에 어떻게
								배치하느냐에 따라 다른 결과물을 낸다는 것이 삶과 참 닮아있어 사진 찍는 것이
								좋습니다.
							</p>
						</div>
					</div>
				{/if}
				<div
					class="no-scrollbar absolute bottom-10 top-36 h-full w-full select-none overflow-hidden overflow-y-scroll p-5 pb-20 max-[1100px]:mt-10 max-[500px]:top-20 max-[500px]:pl-2 max-[500px]:pr-2"
				>
					<slot />
				</div>
			</div>
			<div
				class={clsx(
					"absolute left-1/2 top-1/2 z-10 h-[calc(100%-3rem)] w-[calc(100%-3rem)] -translate-x-1/2 -translate-y-1/2 transform border-white bg-me bg-cover bg-center brightness-[50%]",
					$page && $page.route.id !== "/" && "blur-md"
				)}
			/>
			<div
				class="relative left-0 top-0 h-screen w-full bg-black bg-me bg-cover bg-center blur-sm brightness-[40%]"
			/>
		</div>
	{/if}
</body>

<style>
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
