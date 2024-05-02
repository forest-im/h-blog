<script>
	import emailjs from "@emailjs/browser";

	let copySuccess = false;
	let sendResultMessage = null;

	function sendEmail(e) {
		emailjs.sendForm("service_49ayxzo", "template_t2z61th", e.target, "2s496EAakJS-xHIsC").then(
			(result) => {
				makeMessage("success");
			},
			(error) => {
				makeMessage("fail");
			}
		);
	}

	async function makeMessage(mode) {
		if (mode === "success") {
			sendResultMessage = "메일이 성공적으로 전송되었습니다.";
		} else {
			sendResultMessage = "메일 발송이 실패하였습니다. 다시 시도해주세요.😭";
		}

		setTimeout(() => {
			sendResultMessage = null;
		}, 10000);
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

<div class="flex w-full">
	<div
		class="flex w-full max-w-[50rem] flex-col overflow-hidden rounded-2xl border border-white p-5 text-white"
	>
		<div class="flex w-full flex-col">
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
			class="gform mt-5 flex w-full flex-col gap-5"
			data-email="glowhyun1@gmail.com"
			on:submit|preventDefault={sendEmail}
		>
			<div>
				<label for="name">Your Name</label>
				<input name="name" class="w-full text-black" id="name" type="text" />
			</div>
			<div>
				<label for="email">Your Email Address</label>
				<input name="email" class="w-full text-black" id="email" type="email" />
			</div>
			<div>
				<label for="message">Your Message</label>
				<textarea name="message" class="h-[5rem] w-full text-black" id="message" />
			</div>
			{#if sendResultMessage}
				<div class="mx-auto text-blue-500">{sendResultMessage}</div>
			{/if}
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
