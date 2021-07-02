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
      <label for={id}>{label}</label>
    {/if}
  
    <input on:change bind:value id={id} type="number" placeholder={placeholder} min = {min} max = {max}/>
  
    {#if error}
      <p data-testid="error" class="error">{error}</p>
    {/if}
  </div>
  
  <style lang="scss">
    @use "colors";
    @use "fonts";
    @use "containers";
  
    .iroco-ui-input {
  
      > label {
        @include fonts.Arial(1em, white, bold);
        letter-spacing: .05em;
        padding-bottom: 10px;
        display: inline-block;
      }
  
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