<script  lang="ts">
  export let type = 'button'
  export let disabled = false
</script>

<button class="iroco-ui-button" class:disabled {type} disabled={disabled} on:click>
  <slot/>
</button>

<style lang="scss">
  @use "../scss/colors";
  @use "../scss/fonts";
  @use "../scss/containers";

  .iroco-ui-button {
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: none;
    border-radius: 0.5em;
    flex-shrink: 0;
    padding: 1em;
    margin: 1em 0em;
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
