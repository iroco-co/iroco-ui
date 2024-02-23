<svelte:options accessors={true} />

<script lang="ts">
	export let type = 'button';
	export let disabled = false;
	export let kind: 'danger' | 'success' | 'dark' | 'basic' = 'basic';
	export let size: 'small' | 'regular' = 'regular';
	export let id: string;
</script>

<button
	{id}
	class={`iroco-ui-button iroco-ui-button--${size} iroco-ui-button--${kind}`}
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
