<script>
  export let title = "";
  export let description = "";
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:site_name" content="Svelte Kit Blog" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"></script>
</svelte:head>
