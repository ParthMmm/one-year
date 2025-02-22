<script lang="ts">
	import dayjs from 'dayjs';
	import dayOfYear from 'dayjs/plugin/dayOfYear';

	import { cn } from '../utils';
	import Tooltip from './ui/Tooltip.svelte';
	import { dates } from '../state.svelte';
	dayjs.extend(dayOfYear);

	let currDay = dayjs(Date.now()).dayOfYear();
	let daysLeft = 365 - currDay;

	function toggleDate(id: number) {
		const currIdx = dates.findIndex((date) => date.id === id);

		if (currIdx != -1) {
			dates[currIdx].filled = !dates[currIdx].filled;
		}
	}
</script>

<div class="mx-auto grid grid-cols-12 grid-rows-[53] items-center gap-4">
	{#each dates as day, i}
		<Tooltip side={i % 12 < 6 ? 'left' : 'right'} sideOffset={16}>
			{#snippet trigger({ props })}
				<button
					{...props}
					aria-label={day.date}
					class={cn(
						'h-4 w-4 rounded-full border border-neutral-500 bg-transparent',
						day.filled ? 'border-0 bg-green-500' : '',
						currDay === day.id ? 'animate-pulse border-green-500' : ''
					)}
					onclick={() => toggleDate(day.id)}
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
