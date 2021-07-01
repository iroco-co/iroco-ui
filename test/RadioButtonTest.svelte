<script lang="ts">
    import RadioButton from "../src/RadioButton.svelte"
    export let group: string = '';
</script>

<form>
    <RadioButton label="First" bind:group value="first" name="name"/>
    <RadioButton label="Second" bind:group value="second" name="name"/>
</form>