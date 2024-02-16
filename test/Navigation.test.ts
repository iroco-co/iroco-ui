import { render, within } from '@testing-library/svelte';
import { NavigationItem } from '$lib';
import Navigation from '$lib/Navigation.svelte';

test('Check render with title', () => {
	const { getByTestId, container } = render(Navigation, {
		navigationItems: [new NavigationItem('Green Energy', '/greenenergy')],
		title: 'HomePage',
		type: 'topbar'
	});
	expect(container.querySelector('.navigation__title-container h1')).toBeVisible();
	//expect(container.querySelector('.navigation--mobile')).not.toBeVisible();
	const sideBar = getByTestId('topbar');
	expect(within(sideBar).getByText('Green Energy')).toBeInTheDocument();
	expect(within(sideBar).getByText('Green Energy').href).toEqual(
		'http://localhost:3000/greenenergy'
	);
});

test('Check render with logo', () => {
	const { container } = render(Navigation, {
		navigationItems: [],
		type: 'topbar'
	});

	const logoLink = container.querySelector('.navigation__title-container a.iroco-logo');
	expect(logoLink).not.toBeNull();
	expect(logoLink.href).toEqual('http://localhost:3000/');
	expect(logoLink.getAttribute('aria-label')).toEqual('go to Iroco home');
	expect(logoLink).toBeVisible();
});
