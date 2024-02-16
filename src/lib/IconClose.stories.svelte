<script context="module" type="ts">
	import IconClose from '$lib/IconClose.svelte';

	export const meta = {
		title: 'Iroco-UI/Icons/IconClose',
		component: IconClose,
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
	<IconClose {...args} />
</Template>

<Story name="Default" />
