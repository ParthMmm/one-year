<script lang="ts">
	import { cn } from '../../utils';
	let { className, children, onclick } = $props();
</script>

<button
	class={cn(
		'inline-flex h-8 items-center justify-center  rounded-md px-4 py-2 font-medium transition-colors',
		className
	)}
	{onclick}
>
	{@render children()}
</button>
