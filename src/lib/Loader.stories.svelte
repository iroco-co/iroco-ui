<script context="module" type="ts">
	import { Loader } from '$lib/index';

	export const meta = {
		title: 'Iroco-UI/Atoms/Loader',
		component: Loader,
		argTypes: {

		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';

</script>

<Template let:args>
	<Loader {...args}>
	</Loader>
</Template>

<Story name="Default"></Story>
