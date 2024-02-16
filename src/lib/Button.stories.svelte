<script context="module" type="ts">
	import Button from './Button.svelte';

	export const meta = {
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
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';

	let count = 0;

	function handleClick() {
		count += 1;
	}
</script>

<Template let:args>
	<!--👇 'on:click' allows to forward event to addon-actions  -->
	<Button {...args} on:click on:click={handleClick}>
		You clicked: {count}
	</Button>
</Template>

<Story name="Default"></Story>
<Story name="Success" args={{ kind: 'success' }} />
<Story name="Danger" args={{ kind: 'danger' }} />
<Story name="Dark" args={{ kind: 'dark' }} />
