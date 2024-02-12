<script>
	import { page } from "$app/stores";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import ResponsiveLayer from "$lib/components/ResponsiveLayer.svelte";
	import PageHead from "$lib/components/PageHead.svelte";
	import HomeLayout from "$lib/components/HomeLayout.svelte";

	import "../app.css";
	import "../prism.css";
</script>

<body>
	{#if $page.route.id && ($page.route.id.includes("/categories") || $page.route.id.includes("/tags"))}
		<div class="mx-auto flex min-h-[101vh] w-screen min-w-[350px] flex-col justify-center">
			<main class="relative flex flex-1 flex-col">
				<ResponsiveLayer>
					<div class="max-w-[800px] max-[800px]:w-full min-[800px]:min-w-[800px]">
						<Header />
						<div class="min-h-[80px]" />
						<div
							on:click={() => window && window.scrollTo(0, 0)}
							on:keydown={() => window && window.scrollTo(0, 0)}
							class="fixed bottom-8 right-8 z-40 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-300 opacity-90 shadow-md"
						>
							↑
						</div>
						<slot />
						<Footer />
					</div>
				</ResponsiveLayer>
			</main>
		</div>
	{:else}
		<HomeLayout>
			<slot />
		</HomeLayout>
	{/if}
</body>
