<script>
  import PostList from "$lib/components/PostList.svelte";
  import TagList from "$lib/components/TagList.svelte";

  export let data;
</script>

<TagList tags={data.tags} />
<PostList posts={data.posts} />
