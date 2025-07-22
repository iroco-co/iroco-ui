<script lang="ts">
	interface Props {
		kind: 'secondary' | 'primary' | 'danger' | 'warning';
		children;
	}

	let { kind = 'primary', children }: Props = $props();
</script>

<div class={`boo boo--${kind}`}>
	{@render children?.()}
</div>

<style>
	.boo {
		border-style: solid;
		border-width: 1px;
		border-radius: 5px;
		padding: 1rem;
	}

	.boo--primary {
		border-color: var(--color-primary);
	}

	.boo--secondary {
		border-color: var(--color-secondary);
	}

	.boo--danger {
		border-color: var(--color-danger);
	}

	.boo--warning {
		border-color: var(--color-warning);
	}
</style>
