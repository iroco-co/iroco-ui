<script context="module" type="ts">
	import { IconTrashCan } from '$lib/index';

	export const meta = {
		title: 'Iroco-UI/Icons/IconTrashCan',
		type: 'Icons',
		component: IconTrashCan,
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
	<IconTrashCan {...args} />
</Template>

<Story name="Default" />
