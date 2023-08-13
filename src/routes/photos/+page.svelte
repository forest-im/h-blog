<script>
	import { onMount } from "svelte";
	import HomeSubLayout from "$lib/components/HomeSubLayout.svelte";
	import loading from "$lib/images/loading.png";
	import leo from "$lib/images/photos/01.jpg";
	import flowers from "$lib/images/photos/02.jpg";
	import cat from "$lib/images/photos/03.jpg";
	import sky from "$lib/images/photos/04.jpg";
	import sea from "$lib/images/photos/05.jpg";
	import sea2 from "$lib/images/photos/06.jpg";
	import leo2 from "$lib/images/photos/07.jpg";
	import leo3 from "$lib/images/photos/08.jpg";
	import HomeBackground from "$lib/components/HomeBackground.svelte";

	onMount(() => {
		var lazyloadImages;

		if ("IntersectionObserver" in window) {
			lazyloadImages = document.querySelectorAll(".lazy");
			var imageObserver = new IntersectionObserver(function (entries, observer) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						var image = entry.target;
						image.src = image.dataset.src;
						image.classList.remove("lazy");
						imageObserver.unobserve(image);
					}
				});
			});

			lazyloadImages.forEach(function (image) {
				imageObserver.observe(image);
			});
		} else {
			var lazyloadThrottleTimeout;
			lazyloadImages = document.querySelectorAll(".lazy");

			function lazyload() {
				if (lazyloadThrottleTimeout) {
					clearTimeout(lazyloadThrottleTimeout);
				}

				lazyloadThrottleTimeout = setTimeout(function () {
					var scrollTop = window.pageYOffset;
					lazyloadImages.forEach(function (img) {
						if (img.offsetTop < window.innerHeight + scrollTop) {
							img.src = img.dataset.src;
							img.classList.remove("lazy");
						}
					});
					if (lazyloadImages.length == 0) {
						document.removeEventListener("scroll", lazyload);
						window.removeEventListener("resize", lazyload);
						window.removeEventListener("orientationChange", lazyload);
					}
				}, 20);
			}

			document.addEventListener("scroll", lazyload);
			window.addEventListener("resize", lazyload);
			window.addEventListener("orientationChange", lazyload);
		}
	});
</script>

<HomeSubLayout bgBlur={true}>
	<div class="mb-40 flex flex-col items-center overflow-hidden">
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={leo2}
			alt="my-photo-07"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={leo}
			alt="my-photo-01"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={flowers}
			alt="my-photo-02"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={cat}
			alt="my-photo-03"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={sky}
			alt="my-photo-04"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={sea}
			alt="my-photo-05"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={sea2}
			alt="my-photo-06"
			width="800"
		/>
		<img
			class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
			src={loading}
			data-src={leo3}
			alt="my-photo-08"
			width="800"
		/>
	</div>
</HomeSubLayout>
<HomeBackground hasBlur={true} />
