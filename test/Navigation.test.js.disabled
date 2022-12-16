/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render, within } from '@testing-library/svelte';
import { NavigationItem } from '../src/definition';
import Navigation from '../src/Navigation.svelte';

test('Check render with title', () => {
	const { getByTestId, container } = render(Navigation, {
		navigationItems: [new NavigationItem('Green Energy', '/greenenergy')],
		title: 'HomePage',
		type: 'topbar'
	});
	expect(container.querySelector('.navigation__title-container h1')).toBeVisible();
	expect(container.querySelector('.navigation--mobile')).not.toBeVisible();
	const sideBar = getByTestId('topbar');
	expect(within(sideBar).getByText('Green Energy')).toBeInTheDocument();
	expect(within(sideBar).getByText('Green Energy').href).toEqual('http://localhost/greenenergy');
});

test('Check render with logo', () => {
	const { container } = render(Navigation, {
		navigationItems: [],
		type: 'topbar'
	});

	const logoLink = container.querySelector('.navigation__title-container a.iroco-logo');
	expect(logoLink).not.toBeNull();
	expect(logoLink.href).toEqual('http://localhost/');
	expect(logoLink).toBeVisible();
});
