<script module lang="ts">
	import { IconMoreSign } from '$lib/index';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Iroco-UI/Icons/IconMoreSign',
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
	});
</script>

<Story name="Default" />