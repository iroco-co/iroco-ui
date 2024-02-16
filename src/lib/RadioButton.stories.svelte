<script context="module" type="ts">

	import { RadioButton } from '$lib/index';

	export const meta = {
		title: 'Iroco-UI/Form/RadioButton',
		component: RadioButton,
		argTypes: {
			value: {
				control: { type: 'string' }
			},
			group: {
				control: { type: 'string' }
			},
			name: {
				control: { type: 'string' }
			},
			checked: {
				control: { type: 'boolean' }
			}

		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';

	let group = 'bar';
</script>

<Template let:args>
	<form class="iroco-ui-form">
		<RadioButton bind:group={group}
								 name="name-hello"
								 value="hello" {...args}>
			Hello
		</RadioButton>
		<RadioButton bind:group={group}
								 name="name-foo"
								 value="foo" >
			Foo
		</RadioButton>
		<RadioButton bind:group={group}
								 name="name-bar"
								 value="bar" >
			Bar
		</RadioButton>
	</form>
	Selected group : {group}
</Template>

<Story name="Default"></Story>
