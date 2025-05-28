<script module lang="ts">
	import { Alert } from '$lib/index'
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf'

	const { Story } = defineMeta({
		title: 'Iroco-UI/Atoms/Alert',
		component: Alert
	})
</script>

<script lang="ts">
	setTemplate(template)
</script>

{#snippet template({ ...args })}
	<Alert {...args}>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eros lacus, commodo eu tristique
		non, ultricies eu tellus. Nulla facilisi. Integer a tincidunt purus. Proin vulputate tristique
		magna. Aliquam id eros id ante malesuada interdum. Phasellus tristique ac leo at fringilla. Cras
		a viverra nibh, vitae rutrum ante. Sed pharetra nibh ac velit dignissim ornare sed accumsan
		lacus. Vestibulum tincidunt purus sapien, ac dapibus sem semper a. Nullam venenatis vestibulum
		risus id molestie. Aliquam facilisis nunc at nunc aliquam hendrerit. Etiam sodales sodales
		lectus, ut suscipit lacus vehicula nec. Proin vel magna sed orci condimentum ornare in a odio.
		In varius eu augue eget tincidunt. Ut quis porttitor nulla. Nulla leo nunc, efficitur non ipsum
		vel, tincidunt auctor lectus.
	</Alert>
{/snippet}

<Story name="Default" />
<Story name="Danger" args={{ type: 'danger' }} />
<Story name="Flash" args={{ type: 'flash' }} />
<Story name="Success" args={{ type: 'success' }} />
<Story name="No close button" args={{ showClose:false }} />
