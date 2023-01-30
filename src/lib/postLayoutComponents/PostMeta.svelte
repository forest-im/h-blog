<script>
	import customizingDateFormat from '$lib/utils/customizingDateFormat';

	export let date;
	const formattedDate = customizingDateFormat(date);
</script>

<p>
	<span class="date">{formattedDate}</span>
</p>

<style>
	p {
		margin: 0;
		margin-bottom: calc(var(--spacing-unit) * 4);
	}

	.date {
		color: var(--color-text-secondary);
	}
</style>
