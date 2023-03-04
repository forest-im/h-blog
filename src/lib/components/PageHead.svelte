<script>
  import img from "$lib/images/profile02.png";

  export let title = "";
  export let description = "";
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:site_name" content="AlexIm" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={img} />
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="AlexIm">
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={img} />
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"></script>
</svelte:head>
