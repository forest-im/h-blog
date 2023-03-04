<script>
  import { page } from "$app/stores";
  import clsx from "clsx";

  export let entry;
  export let name;

</script>

<div
  class={clsx(
    "mr-5 text-xl hover:text-pointColor-900 max-[400px]:mr-1",
    $page.route.id === entry && "text-pointColor-900"
  )}
  >
  <a href={entry}>{name}</a>
</div>