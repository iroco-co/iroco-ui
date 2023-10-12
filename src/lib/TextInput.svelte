<script lang="ts">
	/* eslint svelte/no-at-html-tags: "off" */
	import type { TextInputType } from '$lib/definition';

	export let id: string;
	export let type: TextInputType;
	export let name: string;
	export let label: string | null = null;
	export let placeholder: string | undefined;
	export let error: string | null = null;
	export let htmlError = false;
	export let value: string | null = null;
	export let onFocus: (e: FocusEvent) => void | null;
	export let onBlur: (e: Event) => void | null;
	export let readonly = false;
	export let border = false;
	export let autocomplete = 'on';

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<div class="iroco-ui-input">
	{#if label}
		<label class="iroco-ui-label" for={id}>{label}</label>
	{/if}
	<input
		on:input
		bind:value
		on:focus={onFocus}
		on:blur={onBlur}
		{id}
		type="text"
		{name}
		{placeholder}
		class:border
		class:error={error !== null}
		class:readonlyInput={readonly == true}
		use:typeAction
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
	@use './scss/colors';
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
			color: colors.$beige;
			background: colors.$darkBlue;
			border: 1px solid colors.$darkBlue;
			padding: 1em 1.5em;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			border-radius: constants.$border-radius;

			&.border {
				border: 1px solid colors.$beige;
			}

			&::placeholder {
				color: rgba(colors.$beige, 0.5);
			}
			&.error {
				border-color: colors.$red;
			}
			&.readonlyInput {
				cursor: not-allowed;
			}
		}

		.error {
			color: colors.$red;
		}
	}

	.iroco-ui-label {
		color: rgba(colors.$beige, 0.6);
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
