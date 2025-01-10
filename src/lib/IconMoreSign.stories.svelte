<script module lang="ts">
	import { IconMoreSign } from '$lib/index';

	import { defineMeta, Template } from '@storybook/addon-svelte-csf';

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

<Template>
	{#snippet children()}{/snippet}
</Template>

<Story name="Default" />