<script lang="ts">
	export let type: 'success' | 'danger' = 'success';
	export let content: string;
	let hidden = false

</script>

<div class={`alert alert--${type}`} class:hidden={ hidden } on:click={ () => hidden = true}>
	{content}
</div>

<style lang="scss">
	@use '../scss/colors';
	.alert {
		width: 90%;
		min-height: 2em;
		display: flex;
		align-items: center;
		border-radius: 0.5em;
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
	.hidden {
		display: none;
	}
</style>
