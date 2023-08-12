<script>
	import { page } from "$app/stores";
	import clsx from "clsx";
</script>

<div class="relative left-0 top-0 h-screen w-full overflow-hidden bg-black">
	<div class="test z-30" />
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
						<div class="flex gap-2 max-[500px]:text-sm">
							<span><a href="https://www.im-alex.dev/" target="_blank">Blog</a></span>
							<span><a href="https://github.com/h-alex2" target="_blank">Github</a></span>
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
				<a href="/projects"><li class="cursor-pointer">Project</li></a>
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
						배치하느냐에 따라 다른 결과물을 낸다는 것이 삶과 참 닮아있어 사진 찍는 것이 좋습니다.
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
