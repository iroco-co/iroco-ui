<script context="module" type="ts">

	import IconBurger from '$lib/IconBurger.svelte';

	export const meta = {
		title: 'Iroco-UI/Icons/IconBurger',
		component: IconBurger,
		argTypes: {
			width: {
				control: { type: 'range' },
				min: 32,
				max: 512
			},
			height: {
				control: { type: 'range' },
				min: 32,
				max: 512
			},
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<IconBurger {...args}>
	</IconBurger>
</Template>

<Story name="Default"></Story>
