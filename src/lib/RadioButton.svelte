<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		value?: string | number | null;
		group?: string | number | null;
		name?: string | null;
		checked?: boolean;
		children?: import('svelte').Snippet;
	}

	let { value = null, group = $bindable(null), name = null, checked, children }: Props = $props();

	function onchange(event: Event) {
		group = event.currentTarget.value;
	}
</script>

<label class="iroco-ui-radio">
	<input type="radio" bind:group {value} {name} {checked} {onchange} />
	<span class="radio-button-color"></span>
	{@render children?.()}
</label>

<style lang="scss">
  @use './scss/forms';
</style>
