<script>
  import clsx from "clsx";
  export let postsByCategory;
  export let isModal;

  const categoryOpenClosedRecord = postsByCategory.reduce((openRecordObj, post) => {
    openRecordObj[post[0]] = true;

    return openRecordObj;
  }, {});

  function handleCategoryClick(e, category) {
    e.preventDefault();
    categoryOpenClosedRecord[category] = !categoryOpenClosedRecord[category];
  }
</script>

<div
  data-til-list="til-list"
  class={clsx(
    "scrollbar-hide 0.2s color sticky top-[150px] ease-in-out",
    "h-[70vh] min-w-[200px] max-w-[200px]",
    "z-10 overflow-scroll",
    "border-r-[1px] border-solid border-defaultColor-600",
    isModal &&
      "mt-16 max-w-[300px] rounded-xl border-none bg-defaultColor-900 dark:bg-darkDefaultColor-900"
  )}
>
  {#each postsByCategory as [category, posts]}
    <div class="mb-3 pb-5" data-til-list="til-list">
      <a class="hover:text-pointColor-800 " href={`/til/${category}`} data-til-list="til-list">
        <div
          class="w-full cursor-pointer border-solid p-2 font-bold text-defaultColor-700 hover:shadow-md"
          data-til-list="til-list"
        >
          <span
            on:click={(e) => handleCategoryClick(e, category)}
            on:keydown={handleCategoryClick}
            class="mr-2 rounded border-[1px] border-solid pl-[3px] pb-[2px] text-center text-defaultColor-500 hover:text-red-500"
            data-til-list="til-list">{categoryOpenClosedRecord[category] ? "− " : "+ "}</span
          >{category}
        </div>
      </a>
      {#if categoryOpenClosedRecord[category]}
        {#each posts as { title, slug }}
          <a href={`/til/${category}/${slug}`}>
            <div
              class="my-2 cursor-pointer truncate pl-3 text-sm text-defaultColor-600 hover:text-defaultColor-700 dark:text-darkDefaultColor-500 hover:dark:text-darkDefaultColor-600"
            >
              - {title}
            </div>
          </a>
        {/each}
      {/if}
    </div>
  {/each}
</div>

<style lang="postcss">
</style>
