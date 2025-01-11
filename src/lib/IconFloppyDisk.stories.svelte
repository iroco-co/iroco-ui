<script module lang="ts">
	import { IconFloppyDisk } from '$lib/index';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
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
			fill: {
				control: { type: 'color' }
			}
		}
	});
</script>

<Story name="Default" />
