<script module lang="ts">
	import { NavigationItem, NavigationItemType } from '$lib/definition';
	import { NavBar } from '$lib/index';
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'NavBar',
		component: NavBar,
		argTypes: {
			type: {
				control: { type: 'select' },
				options: ['sidebar', 'topbar']
			}
		},
		args: {
			navigationItems: [
				new NavigationItem('About', `/about`),
				new NavigationItem('Foo', `/foo`),
				new NavigationItem('Bar', `/bar`),
				new NavigationItem('Button', `/button`, NavigationItemType.BUTTON),
				new NavigationItem('Anchor', `/anchor`, NavigationItemType.ANCHOR),
				new NavigationItem('Form', `/form`, NavigationItemType.FORM)
			]
		}

	});
</script>
<script lang="ts">
	setTemplate(template);
</script>

{#snippet template({ ...args })}
	<NavBar {...args} />
{/snippet}

<Story name="Default" />
<Story name="Sidebar" args={{ type: 'sidebar' }} />
<Story name="Topbar" args={{ type: 'topbar' }} />
<Story name="Alternative title" args={{ title: 'Alternative title' }} />
<Story name="Active" args={{
	navigating:{to:{url:{pathname:"/bar"}}},
		navigationItems: [
				new NavigationItem('About', `/about`),
				new NavigationItem('Foo', `/foo`),
				new NavigationItem('Bar', `/bar`),
			]
}} />
