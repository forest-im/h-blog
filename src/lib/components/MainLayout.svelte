<script>
	import PageHead from "$lib/components/PageHead.svelte";
	import Category from "$lib/components/Category.svelte";
	import PostList from "$lib/components/PostList.svelte";
	import Pagination from "$lib/components/Pagination.svelte";
	import { afterUpdate } from "svelte/internal";
	import { currentToc } from "$lib/store";

	export let data;

	afterUpdate(() => {
		currentToc.reset();
	});
</script>

<PageHead
	title="Alex's Blog"
	description="공부한 내용을 정리합니다."
	tag="development"
	date="2022-12-23T09:12:21.158Z"
/>
<Category categories={data.categories} postCount={data.postCount} />
<div>
	<PostList posts={data.posts} />
	<Pagination count={data.postCount} />
</div>
