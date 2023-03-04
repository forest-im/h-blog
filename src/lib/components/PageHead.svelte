<script>
  export let title = "";
  export let description = "";
  export let image =""
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:site_name" content="AlexIm" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="twitter:card" content="summary" />
  <meta property="twitter:site" content="AlexIm" />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"></script>
</svelte:head>
