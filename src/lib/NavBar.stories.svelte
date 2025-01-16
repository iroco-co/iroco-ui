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
		}
	});
</script>
<script lang="ts">
	setTemplate(template);
</script>

{#snippet template({ ...args })}

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
{/snippet}

<Story name="Default" />
<Story name="Sidebar" args={{ type: 'sidebar' }} />
<Story name="Topbar" args={{ type: 'topbar' }} />
<Story name="Alternative title" args={{ title: 'Alternative title' }} />
