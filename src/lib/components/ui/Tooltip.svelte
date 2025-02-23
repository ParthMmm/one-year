<script lang="ts">
	import { cn } from '../../utils';
	import { Tooltip } from 'bits-ui';
	import { type Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	type Props = {
		// Core props
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		delayDuration?: number;
		disableHoverableContent?: boolean;

		// Content positioning
		side?: 'top' | 'right' | 'bottom' | 'left';
		sideOffset?: number;
		align?: 'start' | 'center' | 'end';
		alignOffset?: number;

		// Render props
		trigger: Snippet<[{ props: Record<string, unknown> }]>;
		content: Snippet;
		showArrow?: boolean;

		// Styling
		contentClass?: string;
		arrowClass?: string;
	};

	let {
		open = $bindable(false),
		delayDuration = 300,
		disableHoverableContent = false,
		side = 'top',
		sideOffset = 8,
		align = 'center',
		alignOffset = 0,
		showArrow = false,
		contentClass = '',
		arrowClass = '',
		trigger,
		content
	}: Props = $props();
</script>

<Tooltip.Root bind:open {delayDuration} {disableHoverableContent}>
	<Tooltip.Trigger>
		{#snippet child({ props })}
			{@render trigger({ props })}
		{/snippet}
	</Tooltip.Trigger>
	<Tooltip.Portal>
		<Tooltip.Content {side} {sideOffset} {align} {alignOffset} class={contentClass} forceMount>
			{#snippet child({ wrapperProps, props, open })}
				{#if open}
					<div {...wrapperProps}>
						<div
							{...props}
							class={cn(
								'z-0 flex items-center justify-center rounded-md border border-stone-600/75 bg-black/5 p-4 text-sm font-medium text-neutral-400 outline-hidden backdrop-blur-sm',
								contentClass
							)}
							transition:fly={{ x: side === 'left' ? 5 : -5, duration: 200 }}
						>
							{#if showArrow}
								<Tooltip.Arrow class={arrowClass} />
							{/if}
							{@render content()}
						</div>
					</div>
				{/if}
			{/snippet}
		</Tooltip.Content>
	</Tooltip.Portal>
</Tooltip.Root>
