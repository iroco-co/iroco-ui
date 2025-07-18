<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export type ValidationErrorMessage = { key: string; isHtml?: boolean };

	//https://svelte.dev/docs/svelte/typescript#Typing-wrapper-components
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
		onfocus?: ((e: FocusEvent) => void) | null;
		onblur?: ((e: Event) => void) | null;
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
		errors = [],
		htmlError = false,
		value = $bindable(null),
		onfocus = null,
		onblur = null,
		readonly = false,
		border = false,
		autocomplete = 'on',
		oninput,
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
		{oninput}
		bind:value
		{onfocus}
		{onblur}
		{id}
		{type}
		{name}
		{placeholder}
		{autocomplete}
		class:border
		class:error={hasErrors()}
		class:readonlyInput={readonly === true}
		{readonly}
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
