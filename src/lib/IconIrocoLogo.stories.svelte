<script context="module" type="ts">
	import { IconIrocoLogo } from '$lib/index';

	export const meta = {
		title: 'Iroco-UI/Iroco/IconIrocoLogo',
		type: 'Icons',
		component: IconIrocoLogo,
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
			color: {
				control: { type: 'color' }
			}
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<IconIrocoLogo {...args} />
</Template>

<Story name="Default" />
