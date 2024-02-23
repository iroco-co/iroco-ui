<script lang="ts">
	export let id: string;
	export let label: string | '' | undefined;
	export let placeholder: string | '' | undefined = '';
	export let error: string | undefined = undefined;
	export let value: number | undefined = undefined;
	export let min: number | undefined;
	export let max: number | undefined;
</script>

<div class="iroco-ui-input">
	{#if label}
		<label class="iroco-ui-label" for={id}>{label}</label>
	{/if}
	<input on:change bind:value {id} type="number" {placeholder} {min} {max} {...$$restProps} />
	{#if error}
		<p data-testid="error" class="error">{error}</p>
	{/if}
</div>

<style lang="scss">
  @use './scss/forms';
</style>
