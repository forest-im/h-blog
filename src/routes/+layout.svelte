<script>
  import "../app.css";
  import "../prism.css";
  import clsx from "clsx";
  import { page } from "$app/stores";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import PageHead from "$lib/components/PageHead.svelte";
</script>

<PageHead />
<body>
  <Header />
  <div class="mx-auto flex min-h-screen flex-col py-0 px-4">
    <div class="flex flex-col items-center">
      <main
        class={clsx(
          "all-prose flex w-full min-w-[300px] max-w-[800px] flex-col justify-center",
          $page.route.id.includes("til") && "lg:max-w-[1200px]"
        )}
      >
        {#if $page.route.id === '/'}
          <div class="mx-4 min-w-[300px] max-w-[800px] px-4 text-sm font-light">
            Personal blog by Hyunjung Im.
          </div>
        {/if}
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</body>
