<script lang="ts">
    let nightMode: string = 'night';
    function toggle() {
      nightMode = 'day';
    }
</script>

<button class="iroco-ui-button {nightMode}" on:click={toggle}>Test</button>

<style lang="scss">
    @use "colors";
    .iroco-ui-button {
      background-color: green;

    }

    :global(.night) {
      .iroco-ui-button {
        background-color: colors.$darkBlue;
      }
    }
</style>
