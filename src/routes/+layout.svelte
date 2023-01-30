<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
	:global(html, body) {
		box-sizing: border-box;
		padding: 0;
		margin: 0 auto;
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
			Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
		line-height: 1.6;
	}

	:global(body > .toc) {
		display: flex;
		justify-content: space-around;
		padding: 2em 0 1rem 0;
		border: 1px solid #ededed;
		border-radius: 20px;
		font-size: 0.9rem;
		color: #d4d4d4;
	}

	:global(.toc > a) {
		color: #73b0ff;
	}

	:global(.toc > a:hover) {
		color: #006fff;
	}

	:global(s table) {
		font-size: 0.9rem;
	}

	:global(table td) {
		padding: 0;
	}

	:global(img) {
		margin: 1.5rem 0;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
		border-radius: 0.5rem;
		max-width: 100%;
		display: block;
	}

	:global(li) {
		color: #4d4d4d;
		/* list-style: circle; */
	}

	:global(li::marker) {
		color: #b8b8b8;
	}

	:global(li:before) {
		display: inline-block;
		vertical-align: middle;
		padding: 0px 5px 6px 0px;
	}

	:global(a) {
		color: #0070f3;
		text-decoration: none;
	}

	:global(a:hover) {
		content: '‣';
		text-decoration: underline;
	}

	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		padding: 0 1rem;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
