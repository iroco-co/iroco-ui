<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		group?: string | number | null;
		children?: import('svelte').Snippet;
	}

	let { group = $bindable(null), children, ...others }: Props = $props();

</script>

<label class="iroco-ui-radio">
	<input type="radio" bind:group {...others} />
	<span  class="radio-button-color"></span>
	{@render children?.()}
</label>

<style lang="scss">
	@use './scss/forms';
</style>
