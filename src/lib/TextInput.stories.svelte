<script module lang="ts">
	import { TextInput } from '$lib/index';

	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Iroco-UI/Form/TextInput',
		component: TextInput,
		argTypes: {
			type: { control: { type: 'select' } },
			autocomplete: { control: { type: 'select' } }
		}
	});

	let oninputFoo = $state<string | null>('');

	function handleOnInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		oninputFoo = '' + event.data + ' ' + event.timeStamp;
	}
</script>

<script lang="ts">
	setTemplate(template);
</script>

{#snippet template({ ...args })}
	<form class="iroco-ui-form">
		<TextInput {...args} oninput={handleOnInput} />
	</form>
	<p>On input handled : {oninputFoo}</p>
{/snippet}

<Story name="Default" />
<Story name="Text" args={{ type: 'text' }} />
<Story name="Email" args={{ type: 'email' }} />
<Story name="Password" args={{ type: 'password' }} />
<Story name="Label" args={{ label: 'Label' }} />
<Story name="Error" args={{ error: 'An error message' }} />
<Story name="Placeholder" args={{ placeholder: 'A placeholder' }} />
<Story name="Border" args={{ border: true }} />
<Story
	name="Html Error"
	args={{
		error: `<details>
  <summary>HTML error</summary>
  <p>Foo bar</p>
</details>`,
		htmlError: true
	}}
/>
<Story name="Autocomplete" args={{ type: 'text', autocomplete: 'name' }} />
