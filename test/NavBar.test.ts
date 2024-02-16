import { render, within } from '@testing-library/svelte';
import Navigation from '$lib/Navigation.svelte';
import userEvent from '@testing-library/user-event';
import { NavigationItem } from '$lib';
import { NavigationItemType } from '../src/lib';

test('Check render', () => {
	const { getByTestId } = render(Navigation, { navigationItems: [], title: '', type: 'sidebar' });
	expect(getByTestId('sidebar')).toBeInTheDocument();
});

test('Should have one navigation link navigation items', () => {
	const { getByTestId, getAllByText } = render(Navigation, {
		navigationItems: [new NavigationItem('go to madrid', '/Madrid')],
		title: 'HomePage',
		type: 'sidebar'
	});

	expect(getAllByText('HomePage')).toHaveLength(2);

	const sideBar = getByTestId('sidebar');
	expect(within(sideBar).getByText('go to madrid')).toBeInTheDocument();
	expect(within(sideBar).getByText('go to madrid')).not.toHaveClass('iroco-ui-button');
	expect(within(sideBar).getByText('go to madrid').href).toEqual('http://localhost:3000/Madrid');
});

test('Should display one item of type link', async () => {
	const cb = vi.fn();
	const { getByTestId, getAllByText } = render(Navigation, {
		navigationItems: [new NavigationItem('with callback', cb)],
		title: 'HomePage',
		type: 'sidebar'
	});

	expect(getAllByText('HomePage')).toHaveLength(2);

	const sideBar = getByTestId('sidebar');
	const menuItem = within(sideBar).getByText('with callback');
	expect(menuItem).not.toHaveClass('iroco-ui-button');
	expect(menuItem).not.toHaveClass('iroco-ui-button--small');
	expect(menuItem).not.toHaveClass('iroco-ui-button--success');
	expect(menuItem.href).toEqual('http://localhost:3000/#');

	await userEvent.click(menuItem);
	expect(cb).toHaveBeenCalled();
});

test('Should display one item as button', async () => {
	const { findByText } = render(Navigation, {
		navigationItems: [new NavigationItem('with callback', 'link', NavigationItemType.BUTTON)],
		title: 'HomePage',
		type: 'sidebar'
	});
	expect(await findByText('with callback')).toHaveClass('iroco-ui-button');
	expect(await findByText('with callback')).toHaveClass('iroco-ui-button--small');
	expect(await findByText('with callback')).toHaveClass('iroco-ui-button--success');
});

test('Should display one item as post form', async () => {
	const { findByText } = render(Navigation, {
		navigationItems: [new NavigationItem('with form post', 'link', NavigationItemType.FORM)],
		title: 'Logout',
		type: 'sidebar'
	});
	const button = await findByText('with form post');
	expect(button.nodeName).toEqual('BUTTON');
	expect(button).toHaveClass('iroco-ui-link');
	expect(button.parentNode?.nodeName).toEqual('FORM');
});

test('Should display version when provided', async () => {
	const { getByText } = render(Navigation, {
		navigationItems: [],
		title: '',
		type: 'sidebar',
		version: '1.2.3'
	});
	expect(getByText('1.2.3')).toBeInTheDocument();
	expect(getByText('1.2.3')).toHaveClass('nav__version');
});

test('Should not display version when not provided', async () => {
	const { container } = render(Navigation, { navigationItems: [], title: '', type: 'sidebar' });
	expect(container.querySelector('.nav__version')?.textContent).toEqual('');
});
