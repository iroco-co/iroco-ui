<script module lang="ts">
	import { RadioButton } from '$lib/index';

	import {defineMeta,setTemplate} from '@storybook/addon-svelte-csf'

	const {Story} = defineMeta({

		title: 'Iroco-UI/Form/RadioButton',
		component: RadioButton,
	})
	let group = $state('bar');
</script>
<script lang="ts">
	setTemplate(template);
</script>

{#snippet template({ ...args })}
		<form class="iroco-ui-form">
			<RadioButton bind:group name="name-hello" value="hello" {...args}>Hello</RadioButton>
			<RadioButton bind:group name="name-foo" value="foo">Foo</RadioButton>
			<RadioButton bind:group name="name-bar" value="bar">Bar</RadioButton>
		</form>
		Selected group : {group}
	{/snippet}

<Story name="Default" />
