<script module lang="ts">
	import { Steps } from '$lib/index';

	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Iroco-UI/Components/Steps',
		component: Steps,
		args: {
			aria_label: 'Steps example',
			steps: [{ text: 'Foo' }, { text: 'Bar' }, { text: 'Baz' }]
		}
	});
</script>

<script lang="ts">
	setTemplate(template);
</script>

{#snippet template({ ...args })}
	<Steps {...args} />
{/snippet}

<Story name="Default" />
