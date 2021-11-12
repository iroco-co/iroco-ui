<script lang="ts">
	export let type: 'success' | 'danger' = 'success';
	export let content: string;
</script>

<div class={`alert alert--${type}`}>
	{content}
</div>

<style lang="scss">
	@use '../scss/colors';
	.alert {
		width: 100%;
		min-height: 2em;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 1em;
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
