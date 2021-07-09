<script lang="ts">
  export enum TextType { text = "text", email = "email", password = "password" }

  export let id: string;
  export let type: TextType;
  export let label: string | null = null;
  export let placeholder: string | null = null;
  export let error: string | null = null;
  export let value: string | null = null;

  function typeAction(node: HTMLInputElement) {
    node.type = type
  }
</script>

<div class="iroco-ui-input">
  {#if label}
    <label for={id}>{label}</label>
  {/if}

  <input on:input bind:value id={id} type="text" placeholder={placeholder} use:typeAction/>

  {#if error}
    <p data-testid="error" class="error">{error}</p>
  {/if}
</div>

<style lang="scss">
  @use "colors";
  @use "fonts";
  @use "containers";

  .iroco-ui-input {
    > input {
      @include fonts.Arial(1em, colors.$beige);
      background: colors.$darkBlue;
      flex: 1;
      padding: 0.75em 1.5em;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      border-color: colors.$darkBlue;
      margin-bottom: 0.5em;

      &::placeholder {
        color: rgba(colors.$beige, .5);
      }
    }

    > .error {
      color: colors.$red;
    }
  }
</style>
