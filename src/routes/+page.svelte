<script>
	import PostList from "$lib/components/PostList.svelte";
	import TagList from "$lib/components/TagList.svelte";

	export let data;
</script>

<div class="not-prose">
	<TagList tags={data.tags} />
	<PostList posts={data.posts} />
</div>
