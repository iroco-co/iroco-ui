<script lang="ts">
	/* eslint svelte/no-at-html-tags: "off" */
	import { type TextInputType } from '$lib/definition';

	export let id: string;
	export let type: TextInputType = TextInputType.text;
	export let name: string;
	export let label: string | null = null;
	export let placeholder: string | null = null;
	export let error: string | null = null;
	export let htmlError = false;
	export let value: string | null = null;
	export let onFocus: (e: FocusEvent) => void | null = null;
	export let onBlur: (e: Event) => void | null = null;
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
      background: var(--color-body);
      border: 1px solid var(--color-border);
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
