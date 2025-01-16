<script module lang="ts">
	import { Navigation } from '$lib/index';
	import { NavigationItem, NavigationItemType } from './definition';
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({


		title: 'Navigation',
		component: Navigation,
		argTypes: {
			color: {
				control: { type: 'color' }
			}
		},
		args: {
			type: 'topbar',
			navigationItems: [
				new NavigationItem('About', `/about`),
				new NavigationItem('Foo', `/foo`),
				new NavigationItem('Bar', `/bar`),
				new NavigationItem('Button', `/bar`, NavigationItemType.BUTTON),
				new NavigationItem('Anchor', `/bar`, NavigationItemType.ANCHOR),
				new NavigationItem('Form', `/bar`, NavigationItemType.FORM)
			]
		}
	});
</script>
<script lang="ts">
	setTemplate(template);
</script>

{#snippet template({ ...args })}
	<Navigation
		{...args}
	/>
{/snippet}

<Story name="Default" />
<Story name="Sidebar" args={{ type: 'sidebar' }} />
<Story name="Title" args={{ title: 'Alternative title' }} />
<Story name="Color" args={{ color: '#ABCDEF' }} />
<Story name="Active" args={{
	navigating:{to:{url:{pathname:"/bar"}}},
		navigationItems: [
				new NavigationItem('About', `/about`),
				new NavigationItem('Foo', `/foo`),
				new NavigationItem('Bar', `/bar`),
			]
}} />
