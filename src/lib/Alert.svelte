<script lang="ts">
	import IconClose from '$lib/IconClose.svelte';

	export let type: 'success' | 'danger' | 'flash' = 'success';
	export let callback: (e: Event) => void;
</script>

<div class={`alert alert--${type}`}>
	<button on:click={callback} class="alert__close">
		<IconClose width="2em" height="2em" />
	</button>
	<slot />
</div>

<style lang="scss">
	@use './scss/colors';
	@use './scss/constants';
	.alert {
		flex-direction: column;
		position: relative;
		min-height: 2em;
		display: inline-flex;
		align-items: center;
		border-radius: constants.$border-radius;
		padding: 0 1em 0 1em;
		font-size: 1.2em;
		justify-content: center;
		margin-bottom: 1em;
		&--danger {
			background-color: rgba(colors.$red, 0.5);
			border: 1px solid colors.$danger;
		}
		&--success {
			background-color: rgba(colors.$success, 0.5);
			border: 1px solid colors.$success;
		}
		&--flash {
			background-color: rgba(colors.$yellow, 0.5);
			border: 1px solid colors.$warning;
		}
		&__close {
			display: block;
			position: absolute;
			right: 0;
			top: 0;
			background-color: transparent;
			border: none;
			cursor: pointer;
			color: colors.$iconPrimary;
		}
	}
</style>
