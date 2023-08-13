<script>
	import HomeBackground from "$lib/components/HomeBackground.svelte";
	import HomeSubLayout from "$lib/components/HomeSubLayout.svelte";
</script>

<HomeSubLayout bgBlur={true}>
	<div
		class="no-scrollbar mb-32 flex flex-col content-center items-center overflow-y-scroll min-[1100px]:mt-10"
	>
		<div class="mb-20 flex w-full max-w-[800px] flex-col gap-10 text-sm font-normal">
			<div class="flex gap-3 max-[1100px]:flex-col">
				<div class="flex-[0.3]">
					<p class="p-0 text-gray-300 text-white">23.03.07 - 23.05.12</p>
				</div>
				<div class="flex-[0.7]">
					<ul class="leading-6 text-gray-300">
						<li class="font-bold text-white">
							<span
								class="cursor-pointer rounded-xl border border-white pl-1 pr-1 hover:text-blue-500"
							>
								<a href="https://www.jaamtoast.click/" target="_blank">Jaam Toast ↗</a>
							</span>
						</li>
						<li>정적 사이트를 배포하고 Headless CMS를 제공해주는 웹 어플리케이션</li>
						<li>
							Typescript • React • Vite • React-Query • Zustand • Vanilla Extract • Express •
							AWS-SDK
						</li>
						<li>
							<div class="flex gap-3">
								<span
									><a href="https://github.com/jaam-toast/jaam-toast-frontend" target="_blank"
										>Client Github ↗</a
									></span
								>
								<span
									><a href="https://github.com/jaam-toast/jaam-toast-backend" target="_blank"
										>Server Github ↗</a
									></span
								>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="flex gap-3 max-[1100px]:flex-col">
				<div class="flex-[0.3]">
					<p class="p-0 text-gray-300 text-white">22.11.07 - 22.11.25</p>
				</div>
				<div class="flex-[0.7]">
					<ul class="leading-6 text-gray-300">
						<li class="font-bold text-white">
							<span
								class="cursor-pointer rounded-xl border border-white pl-1 pr-1 hover:text-blue-500"
							>
								<a href="https://www.storystorage.me/" target="_blank">Story Storage ↗</a>
							</span>
						</li>
						<li>코드 에디터를 이용해 UI를 저장하고 사용할 수 있는 웹 어플리케이션</li>
						<li>React • Recoil • Styled-components • Express • JWT</li>
						<li>
							<div class="flex gap-3">
								<span
									><a
										href="https://github.com/story-storage-project/storystorage-client"
										target="_blank">Client Github ↗</a
									></span
								>
								<span
									><a
										href="https://github.com/story-storage-project/storystorage-server"
										target="_blank">Server Github ↗</a
									></span
								>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="flex gap-3 max-[1100px]:flex-col">
				<div class="flex-[0.3]">
					<p class="p-0 text-gray-300 text-white">22.10.10 - 22.10.28</p>
				</div>
				<div class="flex-[0.7]">
					<ul class="leading-6 text-gray-300">
						<li class="font-bold text-white">
							<span
								class="cursor-pointer rounded-xl border border-white pl-1 pr-1 hover:text-blue-500"
							>
								<a href="https://aoa.air-mind.live/" target="_blank">Air Mind ↗</a>
							</span>
						</li>
						<li>마인드맵 공유가 가능한 실시간 업무 협업 플랫폼</li>
						<li>
							Next.js • Recoil • Socket io • Styled-components • Express • Firebase Auth • Mongoose
							• Multer-S3
						</li>
						<li>
							<div class="flex gap-3">
								<span
									><a href="https://github.com/h-alex2/air-mind" target="_blank">Client Github ↗</a
									></span
								>
								<span
									><a href="https://github.com/h-alex2/air-mind-server" target="_blank"
										>Server Github ↗</a
									></span
								>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</HomeSubLayout>
<HomeBackground hasBlur={true} />
