<script context="module" type="ts">
    import Button from './Button.svelte';

    export const meta = {
        title: "Button",
        component: Button,
        argTypes: {
            kind: {
                control: {type: 'select'},
                options: ['danger', 'success', 'dark', 'basic'],
            },
            size: {
                control: {type: 'select'},
                options: ['small', 'regular']
            }
        },
    }
</script>

<script>
    import {Story, Template} from '@storybook/addon-svelte-csf';

    let count = 0;

    function handleClick() {
        count += 1;
    }
</script>

<Template let:args>
    <!--👇 'on:click' allows to forward event to addon-actions  -->
    <Button {...args}
            on:click
            on:click={handleClick}>
        You clicked: {count}
    </Button>
</Template>

<Story name="Danger" args={{kind: "danger"}}/>

<!-- Dynamic snippet should be disabled for this story -->
<Story name="Button No Args">
    <Button>Label</Button>
</Story>
