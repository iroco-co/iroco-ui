<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		label?: string | '' | undefined;
		error?: string | undefined;
	}

	let {
		id,
		label,
		error = undefined,
		...rest
	}: Props = $props();
</script>

<div class="iroco-ui-input">
	{#if label}
		<label class="iroco-ui-label" for={id}>{label}</label>
	{/if}
	<input {id} type="number" {...rest} />
	{#if error}
		<p data-testid="error" class="error">{error}</p>
	{/if}
</div>

<style lang="scss">
  @use './scss/forms';
</style>
