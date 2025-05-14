<script lang="ts">
	import { Loader } from 'lucide-svelte';

	export let data;
	let images = data.images;
	let prompt = '';
	let isLoading = false;
	let color = 'bg-blue-400';

	async function onSubmit(event: Event) {
		event.preventDefault();
		isLoading = true;
		color = 'bg-gray-300';

		const response = await fetch('/api/generate', { method: 'POST', body: prompt });
		const data = await response.json();
		console.log(data);
		images = [data.image, ...images];

		isLoading = false;
		prompt = '';
		color = 'bg-blue-400';
	}
</script>

<main class="container mx-auto px-4 py-8 max-w-6xl gap-2">
	<h1 class="text-3xl font-bold text-center">Generator slik</h1>
	<form class="flex flex-col max-w-xl gap-2 text-2xl justify-center mx-auto" on:submit={onSubmit}>
		<div class="flex justify-center">
			<input
				type="text"
				class="border border-pink-400 rounded-xl p-1 flex-grow text-xl text-center"
				name="prompt"
				placeholder="Kakšno sliko želiš?"
				bind:value={prompt}
				required
			/>
		</div>
		<button class="{color} rounded-md" type="submit" disabled={isLoading}
			>Generiraj {#if isLoading}
				<Loader class="animate-spin inline" />
			{/if}</button
		>
	</form>
	<div class="flex flex-col items-center">
		{#each images as image}
			<img class="rounded-xl" src={`data:image/png;base64,${image.base64}`} alt="AI gen" />
			<p class="text-gray-400 text-2xl">Prompt: {image.prompt}</p>
		{/each}
	</div>
</main>
