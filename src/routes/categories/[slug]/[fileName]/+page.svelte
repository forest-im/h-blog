<script>
	import PageHead from "$lib/components/PageHead.svelte";
	import { onMount } from "svelte/internal";
	import { afterUpdate } from "svelte/internal";
	import { currentToc, isOpenMenu, isOpenToc } from "$lib/store";
	import Toc from "$lib/components/Toc.svelte";
	import Category from "$lib/components/Category.svelte";

	export let data;
	let commentSection;
	$: component = data.component;

	afterUpdate(() => {
		currentToc.addToc(Array.from(document.querySelectorAll("h2, h3")));
	});

	onMount(() => {
		if ($isOpenMenu) {
			isOpenMenu.toggle();
		}
		if (!$isOpenToc) {
			isOpenToc.toggle();
		}
		if (commentSection.childNodes.length) return;
		const scriptElem = document.createElement("script");
		scriptElem.src = "https://utteranc.es/client.js";
		scriptElem.async = true;
		scriptElem.setAttribute("repo", "h-alex2/h-blog");
		scriptElem.setAttribute("issue-term", "pathname");
		scriptElem.setAttribute("theme", "github-light");
		scriptElem.setAttribute("label", "blog-comment");
		scriptElem.crossOrigin = "anonymous";
		commentSection.appendChild(scriptElem);
	});
</script>

<PageHead
	title={data.metadata.title}
	description={data.metadata.description}
	tag={data.metadata.tag}
	date={data.metadata.date}
/>
{#if isOpenMenu}
	<Category categories={data.categories} postsCount={data.postsCount} />
{/if}
{#if isOpenToc}
	<Toc />
{/if}
<div class="all-prose m-10 max-w-full">
	<h1 class="mb-1 text-center text-2xl font-semibold">{data.metadata.title}</h1>
	<p class="p-0 text-center text-sm text-neutral-500">{data.metadata.date.slice(0, 10)}</p>
</div>
<hr />

<div class="all-prose max-w-[800px]">
	<svelte:component this={component} />
</div>
<section bind:this={commentSection} class="my-10" />
