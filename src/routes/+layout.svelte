<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import { Tooltip } from 'bits-ui';
	import { MediaQuery } from 'svelte/reactivity';

	const isMobile = new MediaQuery('(max-width: 768px)');
</script>

<svelte:head>
	<title>One Year</title>
	<meta name="description" content="One year" />
	<meta name="theme-color" content="#525252" />
</svelte:head>

<Tooltip.Provider skipDelayDuration={500} delayDuration={1000} disabled={isMobile.current}>
	<div class="h-[100svh] bg-stone-700">
		<!-- <div class="container mx-auto h-full"> -->
		<div class="flex h-full items-center justify-center md:h-full">
			{@render children()}
		</div>
		<!-- </div> -->
	</div>
</Tooltip.Provider>
