<script>
	import { goto } from "$app/navigation";
	export let date;
	export let tags;

	function handleClick(tag) {
		return goto(`/tag/${tag}`);
	}
</script>

<div class="flex flex-wrap text-sm font-normal">
	{#each tags as tag}
		<div on:click|preventDefault={() => handleClick(tag)} on:keydown={handleClick} class="tag">
			{tag}
		</div>
	{/each}
</div>
<div class="date">
	{date}
</div>
