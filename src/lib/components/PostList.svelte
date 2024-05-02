<script>
	import { page } from "$app/stores";

	export let posts;
</script>

<section class="flex min-h-[60vh] w-full flex-1 flex-col overflow-y-auto">
	<div>
		{#each posts as { slug, title, date, description, category, tag }}
			<a
				href={$page.route?.id.includes("til")
					? `/til/categories/${category}/${slug}`
					: `/review/${slug}`}
			>
				<div class="flex items-center gap-10 hover:underline">
					<div class="min-w-20 text-xs">
						{date}
					</div>
					<h1 class="m-1 ml-0 p-0">
						{title}
					</h1>
				</div>
			</a>
		{/each}
	</div>
</section>
