<script context="module" type="ts">
	import { NavigationItem, NavigationItemType } from './definition';
	import { NavBar } from '$lib/index';

	export const meta = {
		title: 'NavBar',
		component: NavBar,
		argTypes: {
			type: {
				control: { type: 'select' },
				options: ['sidebar', 'topbar']
			}
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<NavBar
		{...args}
		navigationItems={[
			new NavigationItem('About', `/about`),
			new NavigationItem('Foo', `/foo`),
			new NavigationItem('Bar', `/bar`),
			new NavigationItem('Button', `/bar`, NavigationItemType.BUTTON),
			new NavigationItem('Anchor', `/bar`, NavigationItemType.ANCHOR),
			new NavigationItem('Form', `/bar`, NavigationItemType.FORM)
		]}
	/>
</Template>

<Story name="Default" />
<Story name="Sidebar" args={{ type: 'sidebar' }} />
<Story name="Title" args={{ title: 'Alternative title' }} />
