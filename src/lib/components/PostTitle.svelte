<script>
	import clsx from "clsx";

	export let slug = "";
	export let title;
	export let category;

	const id = slug
		.toLowerCase()
		.replace(/[^a-zA-Z ]/g, "")
		.replace(/\s/g, "-");
	const href = slug ? `/blog/categories/${category}/${slug}` : "#" + id;
</script>

<h1
	class={clsx(
		"m-1 ml-0 p-0",
		"text-lg font-semibold text-defaultColor-900 dark:text-darkDefaultColor-900"
	)}
>
	<a {href}>
		{title}
	</a>
</h1>
