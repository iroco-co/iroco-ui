<script lang="ts">
    export let label: string = ''; 
    export let value: string | null;
    export let group: string | null = null;
    export let name: string | null;
    let checked: boolean = false;

    function onChange(event) {
		  group = event.currentTarget.value;
	  }

    $: checked = ( group === value )

</script>

<label class="iroco-ui-radio">
  <input type="radio" bind:group={group} value={value} name={name} on:change="{onChange}" {checked}/>
    {#if label}
      {label}
    {:else}
      <slot/>
    {/if}
</label>
  
<style lang="scss">
  @use "colors";
  @use "fonts"; 
  @use "containers";

  .iroco-ui-radio {
   color: colors.$beige;
  }

</style>