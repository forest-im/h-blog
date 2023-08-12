<script>
	import { onMount } from "svelte";

	export let data;
	let copySuccess = false;

	/**
	 *
	 * https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server/blob/master/form-submission-handler.js
	 */

	onMount(() => {
		document.addEventListener("DOMContentLoaded", loaded, false);
	});

	function getFormData(form) {
		var elements = form.elements;
		var honeypot;

		var fields = Object.keys(elements)
			.filter(function (k) {
				if (elements[k].name === "honeypot") {
					honeypot = elements[k].value;
					return false;
				}
				return true;
			})
			.map(function (k) {
				if (elements[k].name !== undefined) {
					return elements[k].name;
					// special case for Edge's html collection
				} else if (elements[k].length > 0) {
					return elements[k].item(0).name;
				}
			})
			.filter(function (item, pos, self) {
				return self.indexOf(item) == pos && item;
			});

		var formData = {};
		fields.forEach(function (name) {
			var element = elements[name];

			// singular form elements just have one value
			formData[name] = element.value;

			// when our element has multiple items, get their values
			if (element.length) {
				var data = [];
				for (var i = 0; i < element.length; i++) {
					var item = element.item(i);
					if (item.checked || item.selected) {
						data.push(item.value);
					}
				}
				formData[name] = data.join(", ");
			}
		});

		// add form-specific values into the data
		formData.formDataNameOrder = JSON.stringify(fields);
		formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
		formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

		return { data: formData, honeypot: honeypot };
	}
	function handleSubmit(event) {
		event.preventDefault(); // we are submitting via xhr below
		var form = event.target;
		var formData = getFormData(form);
		var data = formData.data;

		if (!data.name || !data.email || !data.message) {
			alert("Please fill in the fields.");
			return;
		}

		// If a honeypot field is filled, assume it was done so by a spam bot.
		if (formData.honeypot) {
			return false;
		}

		disableAllButtons(form);
		var url = form.action;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url);
		xhr.withCredentials = true;
		xhr.setRequestHeader(
			"Content-Type",
			"application/x-www-form-urlencoded",
			"Access-Control-Allow-Origin: https://www.im-alex.dev/*"
		);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					form.reset();
					alert("Form submitted successfully!");
				} else {
					alert("Form submission failed. Please try again.");
				}
			}
		};
		// url encode form data for sending as post data
		var encoded = Object.keys(data)
			.map(function (k) {
				return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
			})
			.join("&");
		xhr.send(encoded);

		alert("ok");
	}

	function loaded() {
		// bind to the submit event of our form
		var forms = document.querySelectorAll("form.gform");
		for (var i = 0; i < forms.length; i++) {
			forms[i].addEventListener("submit", handleSubmit, false);
		}
	}

	function disableAllButtons(form) {
		var buttons = form.querySelectorAll("button");
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].disabled = true;
		}
	}

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText("glowhyun1@gmail.com");
			copySuccess = true;
			setTimeout(() => {
				copySuccess = false;
			}, 2000);
		} catch (error) {
			console.error("Failed to copy text:", error);
		}
	}
</script>

<div class="flex w-full items-center justify-center">
	<div
		class="mb-40 flex h-full w-[50rem] flex-col items-center overflow-hidden rounded-2xl border border-white p-5 text-white"
	>
		<div class="flex h-full w-full flex-col">
			<p>My Email</p>
			<div class="flex gap-3">
				<p>glowhyun1@gmail.com</p>
				<button class="cursor-pointer underline hover:text-blue-500" on:click={copyToClipboard}
					>copy</button
				>
				{#if copySuccess}
					<div class="text-blue-500">copied!</div>
				{/if}
			</div>
		</div>
		<form
			class="gform mt-5 flex h-full w-full flex-col gap-5"
			data-email="glowhyun1@gmail.com"
			method="POST"
			action={data.emailUrl}
			on:submit={handleSubmit}
		>
			<div>
				<label for="name">Your Name</label>
				<input name="name" class="w-full text-black" id="name" type="text" />
			</div>
			<div>
				<label for="name">Your Email Address</label>
				<input name="email" class="w-full text-black" id="name" type="email" />
			</div>
			<div>
				<label for="name">Your Message</label>
				<textarea name="message" class="h-[5rem] w-full text-black" />
			</div>
			<button class="mt-5 block h-10 w-full border border-white hover:text-blue-500" type="submit"
				>Send Message</button
			>
		</form>
	</div>
</div>

<style>
	input {
		height: 2rem;
		padding: 0 1rem;
	}

	textarea {
		padding: 1rem;
	}
</style>
