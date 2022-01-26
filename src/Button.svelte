<script lang="ts">
	export let type = 'button';
	export let disabled = false;
	export let kind: 'danger' | 'success' | 'basic' = 'basic';
	export let size: 'small' | 'regular' = 'regular';
	export let rounded = false;
	export let id:string ;
	export let node: HTMLElement ;
</script>

<button
	{id}
	class={`iroco-ui-button iroco-ui-button--${size} iroco-ui-button--${kind}`}
	class:disabled
	class:rounded
	{type}
	{disabled}
	on:click
	bind:this={ node }
>
	<slot />
</button>

<style lang="scss">
	@use '../scss/colors';
	@use '../scss/fonts';
	@use '../scss/containers';

	.iroco-ui-button {
		cursor: pointer;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		border: none;
		border-radius: 0.5em;
		flex-shrink: 0;
		margin: 1em 0em;
		position: relative;

		&--basic {
			background: colors.$beige;
			color: colors.$darkBeige;
		}
		&--success {
			background: colors.$green;
		}
		&--danger {
			background: colors.$red;
			color: colors.$beige;
		}
		&--regular {
			padding: 1em;
		}
		&--small {
			padding: 0.5em;
		}

		&:active {
			background: colors.$lightGrey;
		}

		&.disabled {
			background-color: colors.$lightGrey;
			cursor: default;
		}

		&.rounded {
			border-radius: 10px;
		}
	}
</style>
