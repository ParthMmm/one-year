<script lang="ts">
	import dayjs from 'dayjs';
	import dayOfYear from 'dayjs/plugin/dayOfYear';

	import { cn } from '../utils';
	import Tooltip from './ui/Tooltip.svelte';
	import { dates } from '../state.svelte';
	import { fade } from 'svelte/transition';
	dayjs.extend(dayOfYear);

	let currDay = dayjs(Date.now()).dayOfYear();
	let daysLeft = 365 - currDay;

	let mouseDown = $state(false);

	function toggleDate(id: number) {
		const currIdx = dates.findIndex((date: { id: number }) => date.id === id);

		if (currIdx != -1) {
			dates[currIdx].filled = !dates[currIdx].filled;
		}
	}

	function handleMouseEnter(id: number) {
		if (mouseDown) {
			toggleDate(id);
		}
	}
</script>

<div class="mx-auto grid grid-cols-12 grid-rows-[53] items-center gap-4" transition:fade>
	{#each dates as day, i}
		<Tooltip side={i % 12 < 6 ? 'left' : 'right'} sideOffset={16}>
			{#snippet trigger({ props })}
				<button
					{...props}
					aria-label={day.date}
					class={cn(
						'focus-visble:outline-offset-4 flex h-4 w-4  items-center justify-center rounded-full border border-neutral-500 bg-transparent transition-colors focus-visible:outline focus-visible:outline-green-500',
						day.filled ? 'border-0 bg-green-500' : '',
						currDay === day.id ? 'animate-pulse border-blue-500' : ''
					)}
					onmouseenter={() => handleMouseEnter(day.id)}
					onmousedown={() => (mouseDown = true)}
					onmouseup={() => (mouseDown = false)}
					onclick={() => toggleDate(day.id)}
				>
					<div class="p-4"></div>
				</button>
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
