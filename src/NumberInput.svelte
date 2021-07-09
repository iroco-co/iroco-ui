<script lang="ts">
    export let id: string;
    export let type: string = "number";
    export let label: string | null = null;
    export let placeholder: string | null = null;
    export let error: string | null = null;
    export let value: number | null = null;
    export let min: number | null = null;
    export let max: number | null = null;
</script>
  
<div class="iroco-ui-input">
  {#if label}
    <label class="iroco-ui-label" for={id}>{label}</label>
  {/if}
  <input on:change bind:value id={id} type="number" placeholder={placeholder} min = {min} max = {max}/>
  {#if error}
    <p data-testid="error" class="error">{error}</p>
  {/if}
</div>

<style lang="scss">
  @use "forms";
</style>
