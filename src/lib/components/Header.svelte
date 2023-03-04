<script>
  import profile02 from "$lib/images/profile02.png";
  import Entry from "$lib/components/Entry.svelte";
  import ToggleThemeInput from "$lib/components/ToggleThemeInput.svelte";
  import clsx from "clsx";
</script>

<header
  class={"sticky top-0 z-50 flex w-full justify-center bg-darkDefaultColor-900 dark:bg-defaultColor-900"}
>
  <nav class="w-[800px] min-w-[300px] max-w-[800px] px-4 pt-4 text-defaultColor-700 max-[400px]:px-0">
    <div class={clsx("flex w-full items-center justify-between font-light max-sm:flex-col")}>
      <div class="mx-4 flex items-center w-full">
        <div>
          <a href="/">
            <img src={profile02} alt="profile" class="m-0 mb-5 mr-5 h-20 w-20 shadow-none min-w-[5rem] max-[400px]:mr-1" />
          </a>
        </div>
        <Entry entry='/' name='Blog'/>
        <Entry entry='/til' name='TIL'/>
        <Entry entry='/projects' name='Projects'/>
        <div class="w-full flex justify-end">
          <ToggleThemeInput />
        </div>
      </div>
    </div>
  </nav>
</header>

