<script context="module" type="ts">
	import IconMoreSign from '$lib/IconMoreSign.svelte';

	export const meta = {
		title: 'Iroco-UI/Icons/IconMoreSign',
		type: 'Icons',
		component: IconMoreSign,
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
	<IconMoreSign {...args} />
</Template>

<Story name="Default" />
