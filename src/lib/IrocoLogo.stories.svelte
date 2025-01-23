<script module lang="ts">
	import { IrocoLogo } from '$lib/index';

	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Iroco-UI/Iroco/IrocoLogo',
		type: 'Icons',
		component: IrocoLogo,
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

<script lang="ts">
	setTemplate(template);
</script>

{#snippet template({ ...args })}
	<IrocoLogo {...args} />
{/snippet}

<Story name="Default" />
