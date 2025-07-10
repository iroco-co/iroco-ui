<script lang="ts">
	import IconClose from '$lib/IconClose.svelte';

	interface Props {
		type?: 'success' | 'danger' | 'flash';
		showClose?: boolean;
		callback?: (e: Event) => void;
		children?: import('svelte').Snippet;
	}

	let { type = 'success', showClose = true, callback, children }: Props = $props();
</script>

<div class={`alert alert--${type}`}>
	{#if showClose}
		<button onclick={callback} class="alert__close">
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
		}
	}
</style>
