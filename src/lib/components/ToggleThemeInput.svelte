<script>
	import { onMount } from "svelte";
	import { theme } from "$lib/store";
	import clsx from "clsx";

	let mode;

	onMount(() => {
		if (!localStorage.theme) {
			localStorage.theme = "dark";
			theme.changeTheme("dark");
		}

		mode = localStorage.theme;

		theme.changeTheme(mode);
		setTheme();
	});

	function setTheme() {
		if (localStorage.theme === "dark") {
			document.documentElement.setAttribute("data-theme", "black");
		} else {
			document.documentElement.setAttribute("data-theme", "lofi");
		}
	}

	function handleToggle() {
		localStorage.theme = localStorage.theme === "dark" ? "light" : "dark";

		mode = localStorage.theme;
		theme.changeTheme(mode);
		setTheme();
	}
</script>

{#if mode}
	<!-- <div>
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
	</div> -->
	<label class="swap-rotate swap">
		<!-- this hidden checkbox controls the state -->
		<input type="checkbox" on:change={handleToggle} checked={mode === "light" ? true : false} />
		<!-- sun icon -->
		<svg
			class="swap-on h-10 w-10 fill-current"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			><path
				d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
			/></svg
		>

		<!-- moon icon -->
		<svg
			class="swap-off h-10 w-10 fill-current"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			><path
				d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
			/></svg
		>
	</label>
{/if}

<style>
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
