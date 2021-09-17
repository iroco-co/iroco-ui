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
    <label class="iroco-ui-label" for={id}>{label}</label>
  {/if}
  <input on:input bind:value id={id} type="text" placeholder={placeholder}  class:error="{error !== null}" use:typeAction />
  {#if error !=null}
    <p data-testid="error" class="error">{error !== null ? error: ""}</p>
  {/if}
</div>

<style lang="scss">
  @use "forms";
</style>
