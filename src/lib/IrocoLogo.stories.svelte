<script context="module" type="ts">


	import { IrocoLogo } from '$lib/index';

	export const meta = {
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


	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<IrocoLogo {...args}>
	</IrocoLogo>
</Template>

<Story name="Default"></Story>
