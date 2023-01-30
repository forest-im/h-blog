<script>
	export let title = '';
	export let description = '';
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:site_name" content="Svelte Kit Blog" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>
