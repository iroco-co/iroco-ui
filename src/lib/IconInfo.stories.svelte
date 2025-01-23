<script module lang="ts">
	import { IconInfo } from '$lib/index';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
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
	});
</script>

<Story name="Default" />
