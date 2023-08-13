<script>
	import githubIcon from "$lib/icons/github-mark-white.png";
	import HomeCategory from "./HomeCategory.svelte";
</script>

<div class="relative left-0 top-0 h-screen w-full overflow-hidden bg-black">
	<div class="vignetting z-30" />
	<div class="top-effect z-30" />
	<div class="noise pointer-events-none z-50" />
  

	<!-- header -->
	<div
		class="absolute left-1/2 top-[5rem] z-[99] w-[calc(100%-3.05rem)] -translate-x-1/2 -translate-y-1/2 p-5 text-white max-[500px]:top-[4.2rem] max-[500px]:p-2"
	>
		<div class="flex justify-between">
			<div class="w-full">
				<div class="flex w-full items-center justify-between">
					<a href="/">
						<p class="text-6xl font-thin text-white hover:font-extralight max-[500px]:text-3xl">
							Hyunjung Im
						</p>
					</a>
					<div>
						<a class="z-[50] cursor-pointer" href="https://github.com/h-alex2" target="_blank"
							><img class="m-0 h-8 w-8" src={githubIcon} alt="github" width="32px" /></a
						>
					</div>
				</div>
				<p class="pt-2 font-thin text-white">Frontend Developer</p>
			</div>
		</div>
	</div>

	<HomeCategory />
	<slot />
</div>

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
