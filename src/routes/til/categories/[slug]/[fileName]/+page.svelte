<script>
	import { onDestroy, onMount } from "svelte/internal";
	import { afterUpdate } from "svelte/internal";
	import PageHead from "$lib/components/PageHead.svelte";
	import { noteCategories, currentToc, isOpenMenu, isOpenToc } from "$lib/store";

	export let data;
	let commentSection;
	let observer;

	$: component = data.component;

	afterUpdate(() => {
		currentToc?.addToc(Array.from(document.querySelectorAll("h1, h2, h3")).slice(1));
	});

	onMount(() => {
		noteCategories.setCategory(data.categories);

		if ($isOpenMenu) {
			isOpenMenu.toggle();
		}
		if (!$isOpenToc) {
			isOpenToc.toggle();
		}

		// if (browser) {
		// 	const handleIntersect = (entries) => {
		// 		entries.forEach((entry) => {
		// 			const id = entry.target.getAttribute("id");

		// 			if (entry.intersectionRatio > 0) {
		// 				const currentToc = document.querySelector(`aside ul li a[href="#${id}"]`);
		// 				const tocContainer = currentToc?.closest("aside");

		// 				document.querySelectorAll(".toc").forEach((toc) => toc.classList.remove("active_toc"));

		// 				currentToc?.classList.add("active_toc");

		// 				if (tocContainer) {
		// 					tocContainer.scrollTo({
		// 						top: currentToc?.offsetTop - tocContainer.offsetHeight / 2,
		// 						behavior: "smooth"
		// 					});
		// 				}
		// 			}
		// 		});
		// 	};
		// 	observer = new IntersectionObserver(handleIntersect);
		// }

		// if (commentSection.childNodes.length) {
		// 	return;
		// }

		// const scriptElem = document.createElement("script");
		// scriptElem.src = "https://utteranc.es/client.js";
		// scriptElem.async = true;
		// scriptElem.setAttribute("repo", "h-alex2/h-blog");
		// scriptElem.setAttribute("issue-term", "pathname");
		// scriptElem.setAttribute("theme", "github-light");
		// scriptElem.setAttribute("label", "blog-comment");
		// scriptElem.crossOrigin = "anonymous";
		// commentSection.appendChild(scriptElem);
	});

	$: if ($currentToc) {
		$currentToc?.forEach((section) => observer?.observe(section));
	}

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});
</script>

<PageHead
	title={data.metadata.title}
	description={data.metadata.description}
	tag={data.metadata.tag}
	date={data.metadata.date}
	postImg={data.metadata.image}
	url={data.metadata.url}
/>

<div class="flex w-full overflow-y-auto justify-center">
	<div class="all-prose flex w-full max-w-[850px] flex-1 flex-col items-center">
		<h1 class="mb-1 pt-0 text-center text-2xl font-semibold">{data.metadata.title}</h1>
		<p class="p-0 text-center text-sm text-neutral-500">{data.metadata.date.slice(0, 10)}</p>
		<div class="w-full pb-20">
			<svelte:component this={component} />
		</div>
		<section bind:this={commentSection} class="my-10" />
	</div>
</div>
