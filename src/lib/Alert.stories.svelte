<script context="module" type="ts">
	import Alert from '$lib/Alert.svelte';

	export const meta = {
		title: 'Iroco-UI/Atoms/Alert',
		component: Alert,
		argTypes: {
			type: {
				control: { type: 'select' },
				options: ['success', 'danger', 'flash']
			}
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Alert {...args}>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut porttitor leo a diam. Gravida dictum fusce ut placerat orci
		nulla. Pulvinar sapien et ligula ullamcorper. Ultrices neque ornare aenean euismod. Facilisi
		cras fermentum odio eu feugiat pretium.
	</Alert>
</Template>

<Story name="Default" />
<Story name="Danger" args={{ type: 'danger' }} />
<Story name="Success" args={{ type: 'success' }} />
<Story name="Flash" args={{ type: 'flash' }} />
