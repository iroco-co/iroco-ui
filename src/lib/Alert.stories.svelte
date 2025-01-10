<script module lang="ts">
	import { Alert } from '$lib/index';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Iroco-UI/Atoms/Alert',
		component: Alert
	});
</script>


<Story name="Default">
	{#snippet children(args)}
		<Alert {...args}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eros lacus, commodo eu tristique non,
			ultricies eu tellus. Nulla facilisi. Integer a tincidunt purus. Proin vulputate tristique magna. Aliquam id eros
			id ante malesuada interdum. Phasellus tristique ac leo at fringilla. Cras a viverra nibh, vitae rutrum ante. Sed
			pharetra nibh ac velit dignissim ornare sed accumsan lacus. Vestibulum tincidunt purus sapien, ac dapibus sem
			semper a. Nullam venenatis vestibulum risus id molestie. Aliquam facilisis nunc at nunc aliquam hendrerit. Etiam
			sodales sodales lectus, ut suscipit lacus vehicula nec. Proin vel magna sed orci condimentum ornare in a odio. In
			varius eu augue eget tincidunt. Ut quis porttitor nulla. Nulla leo nunc, efficitur non ipsum vel, tincidunt auctor
			lectus.
		</Alert>
	{/snippet}
</Story>
<Story name="Danger" args={{ type: 'danger' }}>
	{#snippet children(args)}
		<Alert {...args}>Danger</Alert>
	{/snippet}
</Story>
<Story name="Success" args={{ type: 'success' }}>
	{#snippet children(args)}
		<Alert {...args}>Success</Alert>
	{/snippet}
</Story>
<Story name="Flash" args={{ type: 'flash' }}>
	{#snippet children(args)}
		<Alert {...args}>Flash</Alert>
	{/snippet}
</Story>

