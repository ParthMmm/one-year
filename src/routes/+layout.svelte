<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class=" h-screen bg-stone-700">
	<div class="container mx-auto h-full">
		<div class="flex h-full items-center justify-center">
			{@render children()}
		</div>
	</div>
</div>
