<script lang="ts">
	export let type: 'success' | 'danger' = 'success';
	export let callback: (e: Event) => void;
</script>

<div class={`alert alert--${type}`} on:click={callback}>
	<slot />
</div>

<style lang="scss">
	@use './scss/colors';
	@use './scss/constants';
	.alert {
		flex-direction: column;
		min-height: 2em;
		display: inline-flex;
		align-items: center;
		border-radius: constants.$border-radius;
		padding: 0 1em 0 1em;
		font-size: 1.2em;
		justify-content: center;
		margin-bottom: 1em;
		cursor: pointer;
		&--danger {
			background-color: rgba(colors.$red, 0.5);
			border: 1px solid colors.$red;
		}
		&--success {
			background-color: rgba(colors.$green, 0.5);
			border: 1px solid colors.$green;
		}
	}
</style>
