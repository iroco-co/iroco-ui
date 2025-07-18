<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export type ValidationErrorMessage = { key: string; isHtml?: boolean };

	interface Props extends HTMLInputAttributes {
		label?: string | null;
		error?: string | null;
		errors?: Array<ValidationErrorMessage> | null;
		htmlError?: boolean;
		border?: boolean;
		value?: string | null;
		id?: string | null;
	}

	let {
		id,
		type = 'text',
		value = $bindable(),
		placeholder,
		label = null,
		error = null,
		errors = [],
		htmlError = false,
		border = false,
		autocomplete = 'on',
		readonly,
		...rest
	}: Props = $props();

	function hasErrors() {
		return error !== null || (errors?.length ?? 0) > 0;
	}
</script>

<div class="iroco-ui-input">
	{#if label}
		<label class="iroco-ui-label" for={id}>{label}</label>
	{/if}
	<input
		{id}
		{placeholder}
		{readonly}
		{type}
		{value}
		class:border
		class:error={hasErrors()}
		class:readonlyInput={readonly === true}
		{autocomplete}
		{...rest}
	/>
	{#if error != null}
		<p data-testid="error" class="error">
			{#if htmlError}
				{@html error !== null ? error : ''}
			{:else}
				{error !== null ? error : ''}
			{/if}
		</p>
	{/if}
</div>

<style lang="scss">
	@use './scss/forms';
</style>
