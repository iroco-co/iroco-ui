<script lang="ts">
	export let type = 'button';
	export let disabled = false;
	export let kind: 'danger' | 'success' | 'dark' | 'basic' = 'basic';
	export let size: 'small' | 'regular' = 'regular';
	export let id:string ;
	export let node: HTMLElement ;
</script>

<button
	{id}
	class={`iroco-ui-button iroco-ui-button--${size} iroco-ui-button--${kind}`}
	class:disabled
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
		flex-shrink: 0;
		margin: 1em 0em;
		position: relative;
		text-transform: uppercase;

		&--basic {
			background: colors.$beige;
			border: 1px solid colors.$nightBlue;
		}
		&--dark {
			background: colors.$nightBlue;
		}
		&--success {
			background: colors.$green;
		}
		&--danger {
			background: colors.$red;
		}
		&--regular {
			padding: 1em 2em;
		}
		&--small {
			padding: 0.5em 1em;
		}

		&:active {
			background: colors.$lightGrey;
		}

		&.disabled {
			background-color: colors.$lightGrey;
			cursor: default;
		}
	}

</style>
