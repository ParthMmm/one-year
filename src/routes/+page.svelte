<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';
	import Grid from '$lib/components/Grid.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { resetDates } from '$lib/state.svelte';
	let date = new SvelteDate();

	const pad = (n: number) => (n < 10 ? '0' + n : n);

	$effect(() => {
		const interval = setInterval(() => {
			date.setTime(Date.now());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div>
	<h1 class="font-mono text-2xl font-black text-white">One Year</h1>
	<div class="flex flex-row justify-between pb-1 align-middle">
		<span class="font-mono text-neutral-300 tabular-nums">
			{date.getHours()}:{pad(date.getMinutes())}:{pad(date.getSeconds())}
		</span>

		<Button styles="text-neutral-300 text-sm  px-0 hover:text-green-500" onclick={resetDates}
			>Reset</Button
		>
	</div>
	<Grid />
</div>
