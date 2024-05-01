<script>
	import { onMount } from "svelte";
	import loading from "$lib/images/loading.png";
	import leo from "$lib/images/photos/01.jpg";
	import flowers from "$lib/images/photos/02.jpg";
	import cat from "$lib/images/photos/03.jpg";
	import sky from "$lib/images/photos/04.jpg";
	import sea from "$lib/images/photos/05.jpg";
	import sea2 from "$lib/images/photos/06.jpg";
	import leo2 from "$lib/images/photos/07.jpg";
	import leo3 from "$lib/images/photos/08.jpg";
	import flowers2 from "$lib/images/photos/09.jpg";
	import leo4 from "$lib/images/photos/10.jpg";
	import leo5 from "$lib/images/photos/11.jpg";

	onMount(() => {
		if ("IntersectionObserver" in window) {
			const lazyLoadImages = document.querySelectorAll(".lazy");
			const imageObserver = new IntersectionObserver(function (entries, observer) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						const image = entry.target;
						image.src = image.dataset.src;
						image.classList.remove("lazy");
						imageObserver.unobserve(image);
					}
				});
			});

			lazyLoadImages.forEach(function (image) {
				imageObserver.observe(image);
			});
		} else {
			const lazyLoadImages = document.querySelectorAll(".lazy");

			const lazyLoad = () => {
				if (lazyLoadThrottleTimeout) {
					clearTimeout(lazyLoadThrottleTimeout);
				}

				lazyLoadThrottleTimeout = setTimeout(function () {
					const scrollTop = window.scrollY;

					lazyLoadImages.forEach(function (img) {
						if (img.offsetTop < window.innerHeight + scrollTop) {
							img.src = img.dataset.src;
							img.classList.remove("lazy");
						}
					});
					if (lazyLoadImages.length == 0) {
						document.removeEventListener("scroll", lazyLoad);
						window.removeEventListener("resize", lazyLoad);
						window.removeEventListener("orientationChange", lazyLoad);
					}
				}, 20);
			};

			document.addEventListener("scroll", lazyLoad);
			window.addEventListener("resize", lazyLoad);
			window.addEventListener("orientationChange", lazyLoad);
		}
	});
</script>

<div class="mb-40 flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden">
	<div class="w-full max-w-[50rem] shadow-none hover:grayscale-0">
		<img class="lazy" src={loading} data-src={leo2} alt="my-07" width="800" />
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={leo}
			alt="my-01"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={flowers}
			alt="my-02"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={flowers2}
			alt="my-09"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={cat}
			alt="my-03"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={sky}
			alt="my-04"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={sea}
			alt="my-05"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={sea2}
			alt="my-06"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={leo3}
			alt="my-08"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={leo4}
			alt="my-10"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={leo5}
			alt="my-11"
			width="800"
		/>
	</div>
</div>

<style>
	.lazy {
		width: 50rem;
	}

	img {
	}
</style>
