<script>
	import loading from "$lib/images/loading.png";
	import { onMount } from "svelte";

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

<div class="mb-40 flex flex-col items-center overflow-hidden">
	<img
		class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
		src={loading}
		data-src="https://github.com/h-alex2/images/assets/84281505/589f3427-4815-4a6e-a4d2-b07beb488dfc"
		alt="my-photo-07"
		width="800"
	/>
	<img
		class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
		src={loading}
		data-src="https://github.com/h-alex2/images/assets/84281505/dfd495b4-4b69-408a-b8b5-14fbc80913b8"
		alt="my-photo-01"
		width="800"
	/>
	<img
		class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
		src={loading}
		data-src="https://github.com/h-alex2/images/assets/84281505/664d0d52-2d45-4801-bb58-38be0c54b73b"
		alt="my-photo-02"
		width="800"
	/>
	<img
		class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
		src={loading}
		data-src="https://github.com/h-alex2/images/assets/84281505/6555e6fc-0ff9-47ed-ba85-e043eb2e1cfd"
		alt="my-photo-03"
		width="800"
	/>
	<img
		class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
		src={loading}
		data-src="https://github.com/h-alex2/images/assets/84281505/3c3037e3-3499-454a-814f-ad17b8272f7b"
		alt="my-photo-04"
		width="800"
	/>
	<img
		class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
		src={loading}
		data-src="https://github.com/h-alex2/images/assets/84281505/b7e1b028-1676-475d-a65f-4acd618d74cb"
		alt="my-photo-05"
		width="800"
	/>
	<img
		class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
		src={loading}
		data-src="https://github.com/h-alex2/images/assets/84281505/b3ef31cd-66a5-4bdc-8dae-9a0144696d5b"
		alt="my-photo-06"
		width="800"
	/>
	<img
		class="lazy w-full max-w-[50rem] shadow-none hover:grayscale-0"
		src={loading}
		data-src="https://github.com/h-alex2/images/assets/84281505/9a37bd59-5b34-4e4d-af1c-e869990901ee"
		alt="my-photo-08"
		width="800"
	/>
</div>
