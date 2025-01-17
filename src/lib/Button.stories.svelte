<script module lang="ts">
	import { Button } from '$lib/index';

	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({

		title: 'Iroco-UI/Atoms/Button',
		component: Button,
		argTypes: {
			kind: {
				control: { type: 'select' },
				options: ['danger', 'success', 'dark', 'basic']
			},
			size: {
				control: { type: 'select' },
				options: ['small', 'regular']
			}
		}
	});

	let count = $state(0);

	function handleClick() {
		count += 1;
	}
</script>


<script lang="ts">
	setTemplate(template);
</script>

{#snippet template({ ...args })}
	<!--👇 'on:click' allows to forward event to addon-actions  -->
	<Button {...args} onclick={handleClick}>
		You clicked: {count}
	</Button>
{/snippet}

<Story name="Default" />
<Story name="Success" args={{ kind: 'success' }} />
<Story name="Danger" args={{ kind: 'danger' }} />
<Story name="Dark" args={{ kind: 'dark' }} />
