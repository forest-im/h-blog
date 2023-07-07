<script>
	import clsx from "clsx";
	import { currentToc, displaySize, isOpenToc } from "$lib/store";

	let toc;

	$: if ($currentToc.length) {
		toc = $currentToc;
	}
</script>

{#if $isOpenToc && $currentToc.length}
	<aside
		class={clsx(
			"no-scrollbar toc prose-sm fixed bottom-0 right-0 top-0 z-30 flex h-full w-[300px] flex-col overflow-y-auto border-l-[1px] pt-20",
			$displaySize !== "desktop" && "hidden"
		)}
	>
		<ul class="all-prose leading-8">
			<div class="font-semibold">Text of contents ☁️</div>
			{#each $currentToc as toc}
				<li
					class={clsx(
						toc.nodeName !== "H2" && toc.nodeName !== "H1" ? "child ml-5 list-disc" : " pt-2"
					)}
				>
					<a
						href={`#${toc.id}`}
						class="toc scroll-smooth text-sm font-[400] text-gray-500 active:text-red-50"
					>
						{toc.textContent}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
{/if}
