<script>
	import PageHead from "$lib/components/PageHead.svelte";
	import PostTitle from "$lib/components/PostTitle.svelte";
	import Category from "$lib/components/Category.svelte";
	import { onMount } from "svelte/internal";
	import { afterUpdate } from "svelte/internal";
	import { currentToc } from "$lib/store";

	export let data;

	$: component = data.component;

	let commentSection;

	afterUpdate(() => {
		currentToc.addToc(Array.from(document.querySelectorAll("h2, h3")));
	});

	onMount(() => {
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
<div class="box-border flex w-screen justify-center">
	<Category categories={data.categories} allPostsLength={data.allPostsLength} />
	<article class="mx-4 max-w-[800px]">
		<PostTitle title={data.metadata.title} />
		<div class="text-sm">{data.metadata.date.slice(0, 10)}</div>
		<hr />

		<svelte:component this={component} />

		<section bind:this={commentSection} class="my-10" />
	</article>
</div>
