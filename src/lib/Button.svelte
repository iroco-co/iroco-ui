<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	interface Props {
		type?: 'button' | 'reset' | 'submit' | null | undefined;
		disabled?: boolean;
		kind?: 'danger' | 'success' | 'dark' | 'basic';
		size?: 'small' | 'regular';
		fullWidth?: boolean;
		id?: string | null;
		formaction?: string | null;
		form?: string | null;
		children?: import('svelte').Snippet;
		onclick?: MouseEventHandler<HTMLButtonElement>;
	}

	let {
		type = 'button',
		disabled = false,
		kind = 'basic',
		size = 'regular',
		fullWidth = false,
		id = null,
		formaction = null,
		form = null,
		children,
		onclick
	}: Props = $props();
</script>

<button
	{id}
	class={`iroco-ui-button iroco-ui-button--${size} iroco-ui-button--${kind} ${fullWidth ? 'iroco-ui-button--full-width' : ''}`}
	class:disabled
	{type}
	{formaction}
	{disabled}
	{onclick}
	{form}
>
	{@render children?.()}
</button>

<style lang="scss">
	@use './scss/button';
</style>
