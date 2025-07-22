<script module lang="ts">
	import { Alert } from '$lib/index';
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Iroco-UI/Atoms/Alert',
		component: Alert
	});
</script>

<script lang="ts">
	setTemplate(template);
</script>

{#snippet template({ ...args })}
	<Alert {...args} onclose={() => alert('click')}>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		<p>Nunc eros lacus, commodo eu tristique non, ultricies eu tellus.</p>
		<p>Nulla facilisi. Integer a tincidunt purus.</p>
	</Alert>
{/snippet}

<Story name="Default" />
<Story name="Danger" args={{ type: 'danger' }} />
<Story name="Flash" args={{ type: 'flash' }} />
<Story name="Success" args={{ type: 'success' }} />
<Story name="No close button" args={{ showClose: false }} />
