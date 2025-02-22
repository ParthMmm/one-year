<script>
	import { goto } from '$app/navigation';
	import Button from '../lib/components/Button.svelte';
</script>

<div class="flex flex-col items-center justify-center gap-4">
	<h1 class="text-2xl font-bold text-white">Habit Tracker</h1>
	<Button class="border border-neutral-400 text-white" onclick={() => goto('/app')}>Begin</Button>
</div>
