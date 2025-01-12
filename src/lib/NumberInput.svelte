<script lang="ts">
	import type { ChangeEventHandler, HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes{
		id: string;
		label: string | '' | undefined;
		placeholder?: string | '' | undefined;
		error?: string | undefined;
		value?: number | undefined;
		min: number | undefined;
		max: number | undefined;
		onchange: ChangeEventHandler<HTMLInputElement> | null | undefined
	}

	let {
		id,
		label,
		placeholder = '',
		error = undefined,
		value = $bindable(undefined),
		min,
		max,
		onchange,
		...rest
	}: Props = $props();
</script>

<div class="iroco-ui-input">
	{#if label}
		<label class="iroco-ui-label" for={id}>{label}</label>
	{/if}
	<input {onchange} bind:value {id} type="number" {placeholder} {min} {max} {...rest} />
	{#if error}
		<p data-testid="error" class="error">{error}</p>
	{/if}
</div>

<style lang="scss">
  @use './scss/forms';
</style>
