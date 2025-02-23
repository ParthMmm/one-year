<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import { Tooltip } from 'bits-ui';
</script>

<Tooltip.Provider skipDelayDuration={500} delayDuration={500}>
	<div class=" h-screen bg-stone-700">
		<!-- <div class="container mx-auto h-full"> -->
		<div class="flex h-full items-center justify-center">
			{@render children()}
		</div>
		<!-- </div> -->
	</div>
</Tooltip.Provider>
