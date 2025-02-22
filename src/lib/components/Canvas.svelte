<script lang="ts">
	import dayjs from 'dayjs'; // Change this line
	import dayOfYear from 'dayjs/plugin/dayOfYear'; // ES 2015
	import { localStore } from '../localStore.svelte';

	import { SvelteDate } from 'svelte/reactivity';
	import { cn } from '../utils';
	import Tooltip from './ui/tooltip/Tooltip.svelte';
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

	let currDay = dayjs(SvelteDate.now()).dayOfYear();

	let daysLeft = 365 - currDay;

	function toggleDate(id: number) {
		const currIdx = dates.value.findIndex((date) => date.id === id);

		if (currIdx != -1) {
			dates.value[currIdx].filled = !dates.value[currIdx].filled;
		}
	}
</script>

<div class="mx-auto grid grid-cols-12 grid-rows-[53] items-center gap-4">
	{#each dates.value as day, i}
		<Tooltip side={i % 12 < 6 ? 'left' : 'right'} sideOffset={16}>
			{#snippet trigger({ props }: { props: Record<string, unknown> })}
				<button
					{...props}
					aria-label={day.date}
					class={cn(
						'h-4 w-4 rounded-full border border-neutral-500 bg-transparent',
						day.filled ? 'border-0 bg-green-500' : '',
						currDay === day.id ? 'animate-pulse border-green-500' : ''
					)}
					on:click={() => toggleDate(day.id)}
				></button>
			{/snippet}

			{#snippet content()}
				{dayjs(day.date).format('MMM D, YYYY')}
			{/snippet}
		</Tooltip>
	{/each}
	<div class="col-span-7 text-right text-sm font-medium text-neutral-400">
		{daysLeft} days left
	</div>
</div>
