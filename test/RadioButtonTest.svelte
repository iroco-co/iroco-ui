<script lang="ts">
    import RadioButton from "../src/RadioButton.svelte"
    export let group = '';
</script>

<form>
    <RadioButton bind:group value="first" name="name" checked>First</RadioButton>
    <RadioButton bind:group value="second" name="name">Second</RadioButton>
    <RadioButton bind:group value="third" name="name" invisibleInput={ true }>Third</RadioButton>
</form>

