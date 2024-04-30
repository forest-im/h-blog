<script>
	import HomeLayout from "$lib/components/HomeLayout.svelte";

	import "../app.css";
	import "../prism.css";
</script>

<body>
	<HomeLayout>
		<slot />
	</HomeLayout>
</body>
