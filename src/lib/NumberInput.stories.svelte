<script context="module" type="ts">

	import { NumberInput } from '$lib/index';

	export const meta = {
		title: 'Iroco-UI/Form/NumberInput',
		component: NumberInput,
		argTypes: {
			id: {
				control: { type: 'text' }
			},
			label: {
				control: { type: 'text' }
			},
			placeholder: {
				control: { type: 'text' }
			},
			error: {
				control: { type: 'text' }
			},
			value: {
				control: { type: 'number' }
			},
			min: {
				control: { type: 'number' }
			},
			max: {
				control: { type: 'number' }
			}

		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<form class="iroco-ui-form">
		<NumberInput {...args}>
		</NumberInput>
	</form>
</Template>

<Story name="Default"></Story>
<Story name="Label" args={{ label: 'Label' }} />
<Story name="Error" args={{ error: 'An error message' }} />
<Story name="Placeholder" args={{ placeholder: 'A placeholder' }} />
<Story name="Min / Max" args={{ min: 0,max:10,value: 5 }} />
