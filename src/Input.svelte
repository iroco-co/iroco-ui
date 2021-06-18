<script lang="ts">
    export type Type = 'text' | 'password' | 'email' | 'search' | 'url' | 'number' | 'hidden';

  export let id: string;
  export let type: Type;
  export let label: string | null = null;
  export let placeholder: string | null = null;

  export let error: string | null = null;
</script>

<div class="iroco-ui-input">
    {#if label}
        <label for={id}>{label}</label>
    {/if}
    <input id={id} type={type} placeholder={placeholder}/>

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
        padding: 1em 1.5em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        &::placeholder {
          color: rgba(colors.$beige, .5);
        }
      }

      > .error {
        color: colors.$red;
      }
    }
</style>
