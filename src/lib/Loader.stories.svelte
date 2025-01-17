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
	<Loader {...args} />
{/snippet}

<Story name="Default" />
