<script module lang="ts">
	import { IconBurger } from '$lib/index';
	import {defineMeta,Template} from '@storybook/addon-svelte-csf'

	const {Story} = defineMeta({



		title: 'Iroco-UI/Icons/IconBurger',
		component: IconBurger,
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
