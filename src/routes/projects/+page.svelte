<script>
	import airmind2 from "$lib/images/projects/airmind2.png";
	import PageHead from "$lib/components/PageHead.svelte";
	import blog from "$lib/images/projects/blog.png";
	import blog2 from "$lib/images/projects/blog2.png";
	import mind1 from "$lib/images/projects/mind1.png";
	import mind2 from "$lib/images/projects/mind2.png";
	import story1 from "$lib/images/projects/story1.png";
	import story2 from "$lib/images/projects/story2.png";
</script>

<PageHead
	title="Alex's Projects"
	description="진행했던 프로젝트 리스트입니다."
	tag="projects"
	date="2022-12-23T09:12:21.158Z"
/>
<div class="not-prose grid auto-rows-max justify-items-center gap-2 md:grid-cols-2">
	<a href="https://www.jaamtoast.click">
		<div class="my-10">
			<h4 class="text-center">Jaam Toast</h4>
			<div
				class="relative z-10 my-10 max-h-[220px] min-w-[350px] max-w-[350px] overflow-hidden rounded-2xl shadow-xl"
			>
				<img
					width="400"
					class="scale-125 shadow-none"
					src="https://github.com/h-alex2/h-blog/assets/84281505/15386626-c026-4dbb-a083-d7ca9a0ba165"
					alt="img"
				/>
				<img
					width="400"
					class="opacity-1 absolute left-0 top-0 z-10 scale-125 duration-300 ease-in-out first-letter:shadow-none hover:opacity-0"
					src="https://github.com/h-alex2/h-blog/assets/84281505/70a0953f-0e5c-42b0-ac3d-0073a9579eaa"
					alt="img"
				/>
			</div>
		</div>
	</a>
	<a href="https://www.storystorage.me/">
		<div class="my-10">
			<h4 class="text-center">Story Storage</h4>
			<div
				class="relative z-10 my-10 max-h-[220px] min-w-[350px] max-w-[350px] overflow-hidden rounded-2xl shadow-xl"
			>
				<img width="400" class="translate-x-10 scale-125 shadow-none" src={story2} alt="img" />
				<img
					width="400"
					class="opacity-1 absolute left-0 top-0 z-10 translate-x-20 translate-y-3 scale-150 shadow-none duration-300 ease-in-out hover:opacity-0"
					src={story1}
					alt="img"
				/>
			</div>
		</div>
	</a>
	<a href="https://aoa.air-mind.live/">
		<div class="my-10">
			<h4 class="text-center">Air Mind</h4>
			<div
				class="my-10 max-h-[220px] min-w-[350px] max-w-[350px] overflow-hidden rounded-2xl shadow-xl"
			>
				<img
					width="400"
					class="scale left-0 top-0 z-20 scale-125 shadow-none duration-300 ease-in-out hover:scale-150"
					src={airmind2}
					alt="img"
				/>
			</div>
		</div>
	</a>
	<a href="https://minesweeper-by-alex.netlify.app/">
		<div class="my-10">
			<h4 class="text-center">Minesweeper</h4>
			<div
				class="relative z-10 my-10 max-h-[220px] min-w-[350px] max-w-[350px] overflow-hidden rounded-2xl shadow-xl"
			>
				<img width="400" class="scale-150 shadow-none" src={mind2} alt="img" />
				<img
					width="400"
					class="opacity-1 absolute left-0 top-0 z-20 scale-150 shadow-none duration-300 ease-in-out hover:opacity-0"
					src={mind1}
					alt="img"
				/>
			</div>
		</div>
	</a>
	<a href="https://www.im-alex.dev/">
		<div class="my-10">
			<h4 class="text-center">Blog</h4>
			<div
				class="relative z-10 my-10 max-h-[220px] min-w-[350px] max-w-[350px] overflow-hidden rounded-2xl shadow-xl"
			>
				<img width="400" class="translate-y-2 scale-150 shadow-none" src={blog2} alt="img" />
				<img
					width="400"
					class="opacity-1 absolute left-0 top-0 z-20 translate-y-2 scale-150 shadow-none duration-300 ease-in-out hover:opacity-0"
					src={blog}
					alt="img"
				/>
			</div>
		</div>
	</a>
</div>
