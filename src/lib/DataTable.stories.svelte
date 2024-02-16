<script context="module" type="ts">

	import { DataTable } from '$lib/index';

	export const meta = {
		title: 'Iroco-UI/Components/DataTable',
		component: DataTable,
		argTypes: {
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<DataTable {...args}
						 columns={[
			{key:"key1",title:"Title 1"},
			{key:"key2",title:"Title 2"},
			{key:"key3",title:"Title 3"},
		]}
						 rows={[
			{key1:"value 1",key2:"value 2",key3:"value 3"},
			{key1:"value a",key2:"value b",key3:"value c"},
			{key1:1.56,key2:2.76,key3:3.98},
		]}
	>
	</DataTable>
</Template>

<Story name="Default"></Story>
