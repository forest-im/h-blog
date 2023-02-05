<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { theme } from "../../store";
  import profile02 from "$lib/images/profile02.png";
  import clsx from "clsx";

  let mode;

  onMount(() => {
    if (!localStorage.theme) {
      localStorage.theme = "dark";
    }
    mode = localStorage.theme;
    theme.changeTheme(mode);
  });

  function handleToggle() {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = localStorage.theme === "dark" ? "light" : "dark";

    mode = localStorage.theme;
    theme.changeTheme(mode);
  }
</script>

<header
  class={"sticky top-0 z-10 flex w-full justify-center bg-darkDefaultColor-900 dark:bg-defaultColor-900"}
>
  <nav class="w-[800px] min-w-[300px] max-w-[800px] px-4 pt-4 text-defaultColor-700">
    <div class={clsx("flex w-full items-center justify-between font-light")}>
      <div class="mx-4 flex items-center">
        <div>
          <a href="/">
            <img src={profile02} alt="profile" class="m-0 mb-5 mr-5 h-20 w-20 shadow-none" />
          </a>
        </div>
        <div
          class={clsx(
            "mr-5 text-xl hover:text-pointColor-900",
            !$page.route.id.includes("til") && "text-pointColor-900"
          )}
        >
          <a href="/">All</a>
        </div>
        <div
          class={clsx(
            "text-xl hover:text-pointColor-900",
            $page.route.id.includes("til") && "text-pointColor-900"
          )}
        >
          <a href="/til">TIL</a>
        </div>
      </div>
      {#if mode}
        <div class="mr-4">
          <input
            on:change={handleToggle}
            type="checkbox"
            id="toggle"
            hidden
            checked={mode === "dark" ? true : false}
          />
          <label for="toggle" class="toggle-switch">
            <div>
              <div class={clsx("icon dark", mode === "light" && "opacity-0")}>🌙</div>
              <div class="toggle-button" />
              <div class={clsx("icon light", mode === "dark" && "opacity-0")}>☀️</div>
            </div>
          </label>
        </div>
      {/if}
    </div>
  </nav>
</header>

<style lang="postcss">
  li {
    @apply mx-1;
  }

  .toggle-switch {
    width: 50px;
    height: 24px;
    display: block;
    position: relative;
    border-radius: 30px;
    background-color: black;
    cursor: pointer;
  }

  .toggle-switch .toggle-button {
    width: 22px;
    height: 22px;
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 50%;
    background: white;
    z-index: 10;
  }

  #toggle:checked ~ .toggle-switch .toggle-button {
    left: calc(100% - 22px);
    background: #fff;
  }

  .toggle-switch,
  .toggle-button {
    transition: all 0.2s ease-in;
  }

  .icon {
    font-size: large;
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.75rem;
  }

  .dark {
    position: absolute;
    width: 17px;
    height: 17px;
    left: 5px;
    top: 15px;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 0;
    text-shadow: yellow 0 0 10px;
    transition: opacity 0.25s ease;
  }

  .light {
    position: absolute;
    width: 17px;
    height: 17px;
    right: 7px;
    top: 15px;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 0;
  }
</style>
