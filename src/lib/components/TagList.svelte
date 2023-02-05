<script>
  import clsx from "clsx";
  import { page } from "$app/stores";

  export let tags;
  $: tagCount = 15;

  function handleClickTagCount() {
    tagCount = tagCount === 15 ? tags.length : 15;
  }
</script>

<div class="box-border w-full max-sm:hidden">
  <div class="flex flex-col items-center justify-center">
    <div class="m-4 mb-0 flex flex-wrap overflow-auto whitespace-nowrap p-4">
      <a href="/">
        <div
          class={clsx(
            "tag-container",
            !$page.params.slug && "bg-pointInvertColor dark:text-defaultColor-800"
          )}
        >
          #All
        </div>
      </a>
      {#each tags.slice(0, tagCount) as tag}
        <a href={`/tag/${tag[0]}`}>
          <div
            class={clsx(
              "tag-container dark:border-black",
              $page.params.slug === tag[0] && "bg-pointInvertColor dark:text-defaultColor-800"
            )}
          >
            #{tag[0]}
            <span class="text-defaultColor-700 dark:text-darkDefaultColor-700">{tag[1]}</span>
          </div>
        </a>
      {/each}
    </div>
    <div
      class="mb-3 cursor-pointer text-xs text-defaultColor-700 hover:text-pointColor-900"
      on:click={handleClickTagCount}
      on:keydown={handleClickTagCount}
    >
      {tagCount === 15 ? "전체 태그 보기" : "접기"}
    </div>
  </div>
</div>

<style lang="postcss">
  .tag-container {
    @apply ml-0 mt-2 mr-2 mb-1 cursor-pointer rounded-xl border-[1px] border-solid border-darkDefaultColor-700 py-[0.2rem] px-[0.5rem] text-xs  hover:bg-pointInvertColor hover:text-defaultColor-800;
  }
</style>
