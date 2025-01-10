<script module lang="ts">
	import { IconTrashCan } from '$lib/index';

	import {defineMeta,Template} from '@storybook/addon-svelte-csf'

	const {Story} = defineMeta({

		title: 'Iroco-UI/Icons/IconTrashCan',
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
	})
</script>


<Template >
	{#snippet children()}{/snippet}
</Template>

<Story name="Default" />
