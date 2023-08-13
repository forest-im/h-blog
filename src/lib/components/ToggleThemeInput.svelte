<script>
	import { onMount } from "svelte";
	import { theme } from "$lib/store";
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

{#if mode}
	<div>
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

<style lang="postcss">
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
