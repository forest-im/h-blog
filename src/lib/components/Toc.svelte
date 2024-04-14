<script>
	import clsx from "clsx";
	import { currentToc, displaySize, isOpenToc } from "$lib/store";

	let toc;

	$: if ($currentToc.length) {
		toc = $currentToc;
	}
</script>

{#if $isOpenToc && $currentToc.length}
	<div class="relative h-full w-[300px] max-[1000px]:hidden">
		<aside
			class={clsx(
				"no-scrollbar toc prose-sm sticky left-0 z-30 flex w-[300px] flex-col overflow-y-auto"
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
	</div>
{/if}
