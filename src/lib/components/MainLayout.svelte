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

<Category categories={data.categories} postCount={data.postCount} />
<div>
	<PostList posts={data.posts} />
	<Pagination count={data.postCount} />
</div>
