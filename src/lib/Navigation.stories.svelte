<script context="module" type="ts">
	import Navigation from './Navigation.svelte';
	import { NavigationItem } from './definition';

	export const meta = {
		title: 'Navigation',
		component: Navigation,
		argTypes: {
			type: {
				control: { type: 'select' },
				options: ['sidebar', 'topbar']
			},
			title: {
				control: { type: 'text' }
			},
			version: {
				control: { type: 'text' }
			},
			color: {
				control: { type: 'color' }
			}

		},
		args: {
			navigationItems: [
				new NavigationItem('About', `/about`),
				new NavigationItem('Foo', `/foo`),
				new NavigationItem('Bar', `/bar`)]
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Navigation {...args}
							navigationItems={[
							new NavigationItem('About', `/about`),
	new NavigationItem('Foo', `/foo`),
	new NavigationItem('Bar', `/bar`)]}>

	</Navigation>
</Template>

<Story name="Default" />
<Story name="Sidebar" args={{ type: 'sidebar' }} />

<Story name="Title" args={{ title: 'Alternative title' }}></Story>
<Story name="Color" args={{ color: '#ABCDEF' }}></Story>
