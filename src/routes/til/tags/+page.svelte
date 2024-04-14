<script>
	import TagList from "$lib/components/TagList.svelte";
	import Category from "$lib/components/Category.svelte";

	export let data;
</script>

<Category categories={data.categories} postCount={data.postCount} />
<TagList tags={data.tags} />
