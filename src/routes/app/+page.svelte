<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';
	import Canvas from '../../lib/components/Canvas.svelte';

	let date = new SvelteDate();

	const pad = (n) => (n < 10 ? '0' + n : n);

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
	<p class="pb-4 text-neutral-400 tabular-nums">
		{date.getHours()}:{pad(date.getMinutes())}:{pad(date.getSeconds())}
	</p>

	<Canvas />
</div>
