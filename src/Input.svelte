<script lang="ts">
  import {Type} from './input';
  import Input from "./Input.svelte";

  export let name: string;
  export let type: Type;
  export let label: string | null;

  export let error: string | null;
  export let warning: string | null;
</script>

<div class="iroco-ui-input">
    {#if label}
        <label for="{name}">{label}</label>
    {/if}
    <input bind:value={name} type={type}/>

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
