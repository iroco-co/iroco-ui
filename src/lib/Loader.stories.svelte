<script module lang="ts">
	import { Loader } from '$lib/index';

	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Iroco-UI/Atoms/Loader',
		component: Loader,
		argTypes: {}
	});
</script>

<script lang="ts">
	setTemplate(template);
</script>

{#snippet template({ ...args })}
	<p>Loader is not visible by default.</p>
	<Loader {...args} />
{/snippet}

<Story name="Default" />
<Story name="Visible" args={{ visible: true }} />
<Story name="Aria Label" args={{ visible: true, ariaLabel: 'Loading' }} />
