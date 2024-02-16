<script context="module" type="ts">


	import { IconInfo } from '$lib/index';

	export const meta = {
		title: 'Iroco-UI/Icons/IconInfo',
		type: 'Icons',
		component: IconInfo,
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
			}
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<IconInfo {...args}>
	</IconInfo>
</Template>

<Story name="Default"></Story>
