<script lang="ts">
	import type { FormEventHandler, FullAutoFill, HTMLInputAttributes } from 'svelte/elements';

	export type ValidationErrorMessage = { key: string; isHtml?: boolean };

	interface Props extends HTMLInputAttributes {
		id?: string | null;
		type?: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url' | null | undefined;
		name?: string | null;
		label?: string | null;
		placeholder?: string | null;
		error?: string | null;
		errors?: Array<ValidationErrorMessage> | null;
		htmlError?: boolean;
		value?: string | null;
		onFocus?: ((e: FocusEvent) => void) | null;
		onBlur?: ((e: Event) => void) | null;
		readonly?: boolean;
		border?: boolean;
		autocomplete?: FullAutoFill | null | undefined;
		oninput?: FormEventHandler<HTMLInputElement> | null | undefined;
	}

	let {
		id = null,
		type = 'text',
		name = null,
		label = null,
		placeholder = null,
		error = null,
		errors = null,
		htmlError = false,
		value = $bindable(null),
		onFocus = null,
		onBlur = null,
		readonly = false,
		border = false,
		autocomplete = 'on',
		oninput
	}: Props = $props();

	function hasErrors() {
		return error !== null || errors?.length > 0;
	}
</script>

<div class="iroco-ui-input">
	{#if label}
		<label class="iroco-ui-label" for={id}>{label}</label>
	{/if}
	<input
		{oninput}
		bind:value
		onfocus={onFocus}
		onblur={onBlur}
		{id}
		{type}
		{name}
		{placeholder}
		class:border
		class:error={hasErrors()}
		class:readonlyInput={readonly === true}
		{readonly}
		{autocomplete}
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
