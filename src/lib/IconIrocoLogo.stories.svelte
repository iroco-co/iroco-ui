<script context="module" lang="ts">
	import { IconIrocoLogo } from '$lib/index';
	import {defineMeta,setTemplate} from '@storybook/addon-svelte-csf'

	const {Story} = defineMeta({
		title: 'Iroco-UI/Iroco/IconIrocoLogo',
		component: IconIrocoLogo,
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
			color: {
				control: { type: 'color' }
			}
		}
	})
</script>

<script lang="ts">
	setTemplate(template);
</script>

{#snippet template({ ...args })}
	<IconIrocoLogo {...args} />
{/snippet}

<Story name="Default" />
