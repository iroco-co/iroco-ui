<script lang="ts">
  export const label = '';
  export let value: string | null;
  export let group: string | null = null;
  export let name: string | null;
  export let checked: boolean;

  function onChange(event: Event) {
    group = (<HTMLInputElement>event.target).value;
  }

  $: checked = (group === value)

</script>

<label class="iroco-ui-radio">
  <input type="radio" bind:group={ group } value={ value } name={ name } on:change="{ onChange }" { checked }/>
  <span class="radio-button-color"></span>
  <slot/>
</label>

<style lang="scss">
  @use "colors";
  @use "fonts";
  @use "containers";

  .iroco-ui-radio {
    color: colors.$beige;
    position: relative;
    margin-top: 0.5em;
    padding-left: 1.5em;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .iroco-ui-radio input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .radio-button-color {
    position: absolute;
    top: 0;
    left: 0;
    height: 1em;
    width: 1em;

    background-color: colors.$beige;
    border: solid 2px colors.$green;
    border-radius: 50%;
  }

  .iroco-ui-radio input:checked ~ .radio-button-color {
    background-color: colors.$green;

  }
</style>