<script lang="ts">
	import dayjs from 'dayjs';
	import dayOfYear from 'dayjs/plugin/dayOfYear';
	import { MediaQuery } from 'svelte/reactivity';

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

	function handleMouseEnter(id: number, event: MouseEvent) {
		if (mouseDown) {
			toggleDate(id);
			// event?.stopPropagation();
		}
	}
</script>

<div class="mx-auto grid grid-cols-14 items-center gap-3 md:grid-cols-12 md:gap-4" transition:fade>
	{#each dates as day, i}
		<Tooltip side={i % 12 < 6 ? 'left' : 'right'} sideOffset={16}>
			{#snippet trigger({ props })}
				<button
					{...props}
					aria-label={day.date}
					class={cn(
						'focus-visble:outline-offset-4 flex h-2.5 w-2.5 items-center justify-center rounded-full   transition-colors focus-visible:outline focus-visible:outline-green-500 sm:h-3  sm:w-3 md:h-4 md:w-4',

						currDay === day.id ? 'animate-pulse bg-neutral-300 ' : 'bg-neutral-500/50',
						day.filled ? 'border-0 bg-green-500' : ''
					)}
					onmouseenter={(event) => handleMouseEnter(day.id, event)}
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
	<div class="col-span-13 text-right text-sm font-medium text-neutral-300 md:col-span-7">
		{daysLeft} days left
	</div>
</div>
