<script lang="ts">
	let message = '';
	let answer = '';
	let loading = false;
	let history: string[] = [];

	let type: 'joke' | 'image' = 'joke';

	async function onSend(event: any) {
		event.preventDefault();
		console.log(message);
		loading = true;
		const response = await fetch('/api/' + type, { method: 'POST', body: message });

		const data = await response.json();
		console.log('data', data);

		answer = data.message;
		loading = false;
		message = '';
	}
</script>

<main class="flex flex-col items-center justify-center h-screen">
	{#if answer}
		<div class="w-full p-4 text-center text-2xl border-2 border-pink-500 max-w-fit m-4 rounded-lg">
			{answer}
		</div>
		<p class="mb-2 italic">{type}</p>
	{/if}
	<form
		on:submit={onSend}
		method="POST"
		class="flex flex-col border-pink-600 border-2 p-2 justify-center rounded-lg gap-2 text-xl"
	>
		<select bind:value={type} placeholder="Select an option">
			<option value="image">Image</option>
			<option value="joke">Joke</option>
		</select>
		<input
			bind:value={message}
			placeholder="Your message here"
			class="border border-pink-500 rounded-lg p-1 placeholder-shown:text-sm placeholder-shown:p-3"
		/>
		<button
			type="submit"
			disabled={loading}
			class="border border-pink-500 max-w-fit self-center p-1 rounded-xl bg-pink-200">Send</button
		>
	</form>
</main>
