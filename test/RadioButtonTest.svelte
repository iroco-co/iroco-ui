<script lang="ts">
    import RadioButton from "../src/RadioButton.svelte"
    export let group = '';
</script>

<form>
    <RadioButton bind:group value="first" name="name">First</RadioButton>
    <RadioButton bind:group value="second" name="name">Second</RadioButton>
</form>