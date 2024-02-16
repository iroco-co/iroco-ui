<script context="module" type="ts">


	import { TextInput } from '$lib/index';

	export const meta = {
		title: 'Iroco-UI/Form/TextInput',
		component: TextInput,
		argTypes: {
			id: {
				control: { type: 'text' }
			},
			type: {
				control: { type: 'select' },
				options: ['text', 'email', 'password']
			},
			name: {
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
			htmlError: {
				control: { type: 'text' }
			},
			value: {
				control: { type: 'number' }
			},
			readonly: {
				control: { type: 'boolean' }
			},
			border: {
				control: { type: 'boolean' }
			},
			autocomplete: {
				control: { type: 'text' }
			}
		},
		args: {
			type: 'text'
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';

	let group = 'bar';
</script>

<Template let:args>
	<form class="iroco-ui-form">
		<TextInput {...args}></TextInput>
	</form>
</Template>

<Story name="Default"></Story>
<Story name="Text" args={{ type: 'text' }} />
<Story name="Email" args={{ type: 'email' }} />
<Story name="Password" args={{ type: 'password' }} />
<Story name="Label" args={{ label: 'Label' }} />
<Story name="Error" args={{ error: 'An error message' }} />
<Story name="Placeholder" args={{ placeholder: 'A placeholder' }} />
<Story name="Border" args={{ placeholder: 'A placeholder' }} />
<Story name="Html Error" args={{error:`<details>
  <summary>HTML error</summary>
  <p>Foo bar</p>
</details>`, htmlError: true }} />
<Story name="Autocomplete" args={{ type:'text',autocomplete: 'name' }} />
