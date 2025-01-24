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
	.iroco-ui-radio {
		color: var(--color-text);
		position: relative;
		margin-top: 0.5em;
		padding-left: 1.5em;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.iroco-ui-radio input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
	}

	.radio-button-color {
		position: absolute;
		top: 0;
		left: 0;
		height: 1em;
		width: 1em;
		background-color: var(--form-element-bg);
		border-radius: 50%;
	}

	.iroco-ui-radio input:checked ~ .radio-button-color {
		background-color: var(--color-primary);
	}
</style>
