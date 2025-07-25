<script lang="ts">
	import IconClose from '$lib/IconClose.svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	interface Props {
		type?: 'success' | 'danger' | 'flash';
		showClose?: boolean;
		fullWidth?: boolean;
		onclose?: MouseEventHandler<HTMLButtonElement>;
		children?: import('svelte').Snippet;
	}

	let {
		type = 'success',
		showClose = true,
		fullWidth = false,
		onclose,
		children
	}: Props = $props();
</script>

<div class={['alert', `alert--${type}`, { fullWidth }]}>
	{#if showClose}
		<button onclick={onclose} class="alert__close">
			<IconClose width="2em" height="2em" />
		</button>
	{/if}
	{@render children?.()}
</div>

<style lang="scss">
	@use './scss/constants';

	.alert {
		flex-direction: column;
		position: relative;
		min-height: 2em;
		display: inline-flex;
		align-items: center;
		border-radius: constants.$border-radius;
		padding: 0.25rem 2rem 0.25rem 1em;
		font-size: 1.2em;
		justify-content: center;
		margin-top: 0.75rem;
		margin-bottom: 1rem;

		&--danger {
			background-color: var(--color-danger-bg);
			border: 1px solid var(--color-danger);
		}

		&--success {
			background-color: var(--color-success-bg);
			border: 1px solid var(--color-success);
		}

		&--flash {
			background-color: var(--color-warning-bg);
			border: 1px solid var(--color-warning);
		}

		&__close {
			display: block;
			position: absolute;
			right: 0.1rem;
			top: 0.2rem;
			background-color: transparent;
			border: none;
			cursor: pointer;
			color: var(--color-icon-primary);

			&:focus {
				outline-color: var(--color-secondary);
				outline-style: auto;
			}
		}
		&.fullWidth {
			width: 100%;
		}
	}
</style>
