<script context="module" type="ts">


	import { IconFloppyDisk } from '$lib/index';

	export const meta = {
		title: 'Iroco-UI/Icons/IconFloppyDisk',
		component: IconFloppyDisk,
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
			fill:{
				control: { type: 'color' },
			}
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<IconFloppyDisk {...args}>
	</IconFloppyDisk>
</Template>

<Story name="Default"></Story>
