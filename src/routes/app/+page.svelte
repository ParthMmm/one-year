<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';
	import Grid from '../../lib/components/Grid.svelte';
	import Button from '../../lib/components/ui/Button.svelte';
	import { dates, resetDates } from '../../lib/state.svelte';
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
	<div class="flex flex-row justify-between pb-1 align-middle">
		<span class="text-neutral-400 tabular-nums">
			{date.getHours()}:{pad(date.getMinutes())}:{pad(date.getSeconds())}
		</span>

		<Button styles="text-neutral-400 px-0 hover:text-green-500" onclick={resetDates}>Reset</Button>
	</div>
	<Grid />
</div>
