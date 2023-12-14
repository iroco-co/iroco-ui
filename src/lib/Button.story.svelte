<script lang="ts">
    import {logEvent} from 'histoire/client'
    import Button from './Button.svelte'
    import type { Hst } from '@histoire/plugin-svelte'

    export let Hst: Hst

    let disabled = false
    let size = 'small'
    let type = 'button'
    let kind = 'basic'
    // let node : 'small' | 'regular' | undefined = 'small'
</script>

<Hst.Story title="Button">

    <Hst.Variant title="Default">
        <Button
                {disabled}
                {size}
                {kind}
                on:click={event => logEvent('click', event)}
                id="bar">
            Click me!
        </Button>
    </Hst.Variant>

    <Hst.Variant title="Danger">
        <Button
                kind="danger"
                id="bar-danger">
            Click me!
        </Button>
    </Hst.Variant>


    <svelte:fragment slot="controls">
        <Hst.Checkbox
                bind:value={disabled}
                title="Disabled"
        />
        <Hst.Select
                bind:value={size}
                options={['small', 'regular']}
                title="Size"
        />
        <Hst.Select
                bind:value={kind}
                options={['danger', 'success','dark','basic']}
                title="Kind"
        />
        <Hst.Select
                bind:value={type}
                options={['button', 'submit','reset']}
                title="Type"
        />
        <pre>{JSON.stringify({disabled, size}, null, 2)}</pre>
    </svelte:fragment>
</Hst.Story>

<style>
    pre {
        padding: 8px;
        background: rgba(0, 0, 0, .1);
        border-radius: 4px;
        margin: 8px;
        font-size: 0.8rem;
    }
</style>
