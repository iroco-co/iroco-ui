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
	@use './scss/constants';

	input,
	textarea {
		outline: none;
		text-decoration: none;
		font-size: 14px;

		&:focus {
			outline: none;
			text-decoration: none;
			font-size: 14px;
		}
	}

	.iroco-ui-input {
		display: flex;
		flex-direction: column;

		> input {
			color: var(--color-text);
			background: var(--color-dark-blue);
			border: 1px solid var(--color-dark-blue);
			padding: 1em 1.5em;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			border-radius: constants.$border-radius;

			&.border {
				border: 1px solid var(--form-element-border);
			}

			&::placeholder {
				color: var(--color-text-op-50);
			}

			&.error {
				border-color: var(--color-danger);
			}

			&.readonlyInput {
				cursor: not-allowed;
			}
		}

		.error {
			color: var(--color-danger);
		}
	}

	.iroco-ui-label {
		color: var(--color-text-op-60);
		font-weight: bold;
		padding-bottom: 10px;
		display: inline-block;
	}

	.field {
		margin-top: 20px;

		&:first-child {
			margin: 0;
		}
	}
</style>
