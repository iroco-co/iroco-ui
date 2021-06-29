<script lang="ts">
    export let label: string = "";
    export let type: string
    export let disabled: boolean = false
</script>

<button class="iroco-ui-button" class:disabled="{disabled}" type="{type}" disabled={disabled}>
  {#if label}
    {label}
  {:else}
    <slot/>
  {/if}
</button>

<style lang="scss">
    @use "colors";
    @use "fonts"; 
    @use "containers";

    .iroco-ui-button {
      cursor: pointer;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      border: none;
      flex-shrink: 0;
      padding: 1em;
      margin: 1em;
      background: colors.$green;
      position: relative;

      &:active {
        background: colors.$lightGrey;
      }

      &.disabled {
        background-color: colors.$lightGrey;
        cursor: default;
      }
    }
</style>
