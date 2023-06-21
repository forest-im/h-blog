<script>
	import PageHead from "$lib/components/PageHead.svelte";
	import PostList from "$lib/components/PostList.svelte";
	import TagList from "$lib/components/TagList.svelte";

	export let data;
</script>

<PageHead
	title="Alex's Blog"
	description="공부한 내용을 정리합니다."
	tag="development"
	date="2022-12-23T09:12:21.158Z"
/>
<TagList tags={data.tags} />
<PostList posts={data.posts} />
