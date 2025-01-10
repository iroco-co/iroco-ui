<svelte:options accessors={true} />

<script lang="ts">
	export let type:'button' | 'reset' | 'submit' | null | undefined = 'button';
	export let disabled = false;
	export let kind: 'danger' | 'success' | 'dark' | 'basic' = 'basic';
	export let size: 'small' | 'regular' = 'regular';
	export let fullWidth: boolean = false;
	export let id: string;
</script>

<button
	{id}
	class={`iroco-ui-button iroco-ui-button--${size} iroco-ui-button--${kind} ${fullWidth?'iroco-ui-button--full-width':''}`}
	class:disabled
	{type}
	{disabled}
	on:click
>
	<slot />
</button>

<style lang="scss">
  @use './scss/button';
</style>
