<script>
  import TilPost from "$lib/components/TilPost.svelte";

  export let data;
</script>

<TilPost tils={data.recentTils} />
