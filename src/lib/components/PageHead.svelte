<script>
	import img from "$lib/images/profile02.png";

	export let title;
	export let description;
	export let tag;
	export let date;
	export let postImg;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="date" content={date} />
	<meta name="title" content={title} />
	<meta name="description" content={description ?? ""} />
	<meta name="keywords" content={tag} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description ?? ""} />
	<meta property="og:image" content={postImg ?? img} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description ?? ""} />
	<meta name="twitter:image" content={postImg ?? img} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content="https://www.im-alex.dev/" />
	<meta name="twitter:app:name:iphone" content="Alex im" />
	<meta name="twitter:app:name:googleplay" content="Alex im" />
	<script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"></script>
</svelte:head>
