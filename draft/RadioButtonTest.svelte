<svelte:options accessors={true} />

<script lang="ts">
	import RadioButton from './RadioButton.svelte';
	export let group = '';
</script>

<form>
	<RadioButton bind:group value="first" name="name" checked>First</RadioButton>
	<RadioButton bind:group value="second" name="name">Second</RadioButton>
</form>
