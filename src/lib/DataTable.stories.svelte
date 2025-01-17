<script module lang="ts">
	import { DataTable } from '$lib/index';

	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({

		title: 'Iroco-UI/Components/DataTable',
		component: DataTable,
		argTypes: {},
		args: {
			columns: [
				{ key: 'key1', title: 'Title 1' },
				{ key: 'key2', title: 'Title 2' },
				{ key: 'key3', title: 'Title 3' }
			],
			rows: [
				{ key1: 'value 1', key2: 'value 2', key3: 'value 3' },
				{ key1: 'value a', key2: 'value b', key3: 'value c' },
				{ key1: 1.56, key2: 2.76, key3: 3.98 }
			]
		}
	});
</script>
<script lang="ts">
	setTemplate(template);
</script>

{#snippet template({ ...args })}
	<DataTable
		{...args}

	/>
{/snippet}

<Story name="Default" />
