<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		kind?: 'danger' | 'success' | 'dark' | 'basic';
		size?: 'small' | 'regular';
		fullWidth?: boolean;
	}

	let {
		type = 'button',
		disabled = false,
		kind = 'basic',
		size = 'regular',
		fullWidth = false,
		children,
		...rest
	}: Props = $props();
</script>

<button
	class={`iroco-ui-button iroco-ui-button--${size} iroco-ui-button--${kind} ${fullWidth ? 'iroco-ui-button--full-width' : ''}`}
	{disabled}
	class:disabled
	{...rest}
>
	{@render children?.()}
</button>

<style lang="scss">
	@use './scss/button';
</style>
