<script lang="ts">
	import { type Snippet } from 'svelte';
	import { cn } from '../../utils';
	let { styles, children, onclick } = $props<{
		styles?: string;
		children: Snippet;
		onclick?: () => void;
	}>();
</script>

<button
	class={cn(
		'inline-flex h-8 items-center justify-center  rounded-md px-4 py-2 font-medium transition-colors',
		styles
	)}
	{onclick}
>
	{@render children()}
</button>
