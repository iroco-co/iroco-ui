<script lang="ts">
    export let label: string
    export let type: string
</script>

<button class="iroco-ui-button" type="{type}">{label}</button>

<style lang="scss">
    @use "colors";
    @use "fonts";
    @use "containers";

    .iroco-ui-button {
      display: block;
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
    }
</style>
