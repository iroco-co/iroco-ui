<script lang="ts">
	import IconClose from '$lib/IconClose.svelte';

	interface Props {
		type?: 'success' | 'danger' | 'flash';
		callback?: (e: Event) => void;
		children?: import('svelte').Snippet;
	}

	let { type = 'success', callback, children }: Props = $props();
</script>

<div class={`alert alert--${type}`}>
	<button onclick={callback} class="alert__close">
		<IconClose width="2em" height="2em" />
	</button>
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
    padding: 0 2rem 0 1em;
    font-size: 1.2em;
		justify-content: center;
		margin-bottom: 1em;
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
			right: 0;
			top: 0;
			background-color: transparent;
			border: none;
			cursor: pointer;
			color: var(--color-icon-primary);
		}
	}
</style>
