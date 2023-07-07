<script>
	import TagList from "$lib/components/TagList.svelte";
	import Category from "$lib/components/Category.svelte";

	export let data;
</script>

<Category categories={data.categories} allPostsLength={data.posts.length} />
<TagList tags={data.tags} />
