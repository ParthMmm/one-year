<script lang="ts">
	import dayjs from 'dayjs'; // Change this line
	import dayOfYear from 'dayjs/plugin/dayOfYear'; // ES 2015
	import { localStore } from '../localStore.svelte';

	import { SvelteDate } from 'svelte/reactivity';
	import { cn } from '../utils';
	dayjs.extend(dayOfYear);

	// Get the current year and set start/end dates
	let currentYear = dayjs().year();
	let startDate = dayjs(`${currentYear}-01-01`);
	let endDate = dayjs(`${currentYear}-12-31`);

	let dates = localStore(
		'dates',
		Array.from({ length: endDate.diff(startDate, 'days') + 1 }, (_, i) => ({
			id: i,
			date: startDate.add(i, 'days').format('YYYY-MM-DD'),
			filled: false
		}))
	);

	// Generate dates array using runes
	// let dates = Array.from({ length: endDate.diff(startDate, 'days') + 1 }, (_, i) => ({
	// 	id: i,
	// 	date: startDate.add(i, 'days').format('YYYY-MM-DD'),
	// 	filled: false
	// }));

	let currDay = dayjs(SvelteDate.now()).dayOfYear();

	function toggleDate(id: number) {
		const currIdx = dates.value.findIndex((date) => date.id === id);
		console.log(currIdx, id);
		if (currIdx != -1) {
			dates.value[currIdx].filled = !dates.value[currIdx].filled;
		}
	}
</script>

<div class="mx-auto grid grid-cols-12 grid-rows-[53] gap-4">
	{#each dates.value as day, i}
		<button
			aria-label={day.date}
			class={cn(
				'h-4 w-4 rounded-full border border-neutral-500 bg-transparent',
				day.filled ? 'border-0 bg-green-500' : ''
			)}
			onclick={() => toggleDate(day.id)}
		></button>
	{/each}
</div>
