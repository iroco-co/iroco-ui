<script lang="ts">
    export type Type = 'text' | 'password' | 'email' | 'search' | 'url' | 'number' | 'hidden';

  export let id: string;
  export let type: Type;
  export let label: string | null;

  export let error: string | null;
  export let warning: string | null;
</script>

<div class="iroco-ui-input">
    {#if label}
        <label for={id}>{label}</label>
    {/if}
    <input id={id} type={type}/>

    {#if error}
        <p class="error">{error}</p>
    {/if}

    {#if warning}
        <p class="warning">{warning}</p>
    {/if}
</div>
<style lang="scss">
    @use "colors";
    @use "fonts";
    @use "containers";

    .iroco-ui-input {

      > label {

      }

      > input {

      }

      > .error {

      }

      > .warning {

      }

    }
</style>
