<script>
  import clsx from "clsx";

  export let tils;
</script>

<div class="w-full px-3 max-[640px]:w-[500px]">
  {#each tils as { default: component, metadata }}
    <div
      class={clsx(
        "flex flex-col justify-evenly rounded-xl p-4 text-left text-defaultColor-900 shadow-customSm dark:border-[1px] dark:border-solid dark:border-darkDefaultColor-500 dark:text-darkDefaultColor-900 max-[640px]:shadow-none"
      )}
    >
      <div>
        <h1 class="text-pointColor-900">{metadata.title}</h1>
        <div class="max-[640px]:w-[80vw]">
          <svelte:component this={component} />
        </div>
      </div>
    </div>
    <hr />
  {/each}
</div>

<style lang="postcss">
  .container {
    @apply flex flex-col justify-evenly rounded-xl p-4 text-left text-defaultColor-900
    shadow-customSm dark:text-darkDefaultColor-900;
  }
</style>
