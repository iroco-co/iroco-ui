<script lang="ts">
    export const label = '';
    export let value: string | null;
    export let group: string | null = null;
    export let name: string | null;
    export let checked: boolean;
    export let invisibleInput = false;

    function onChange(event: Event) {
      group = (<HTMLInputElement>event.target).value;
    }

    $: checked = (group === value)

</script>

<label class="iroco-ui-radio">
    <input type="radio" bind:group={ group } value={ value } name={ name } on:change="{ onChange }" { checked } class:invisibleInput="{ invisibleInput===true }" invisibleInput = { invisibleInput }/>
    <slot/>
</label>

<style lang="scss">
  @use "colors";
  @use "fonts";
  @use "containers";

  .iroco-ui-radio {
    color: colors.$beige;
  }
  input[type=radio].invisibleInput {
    visibility:hidden;
    display:none;
  }

</style>