/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { findByText, render, within } from '@testing-library/svelte';
import Navigation from '../src/Navigation.svelte';
import userEvent from '@testing-library/user-event';
import { NavigationItem } from '../src';

test('Check render', () => {
	const { getByTestId } = render(Navigation, { navigationItems: [], title: '', type: 'sidebar' });
	expect(getByTestId('sidebar')).toBeInTheDocument();
});

test('Should have one navigation link nœavigation items', () => {
	const { getByTestId, getAllByText } = render(Navigation, {
		navigationItems: [new NavigationItem('go to madrid', '/Madrid')],
		title: 'HomePage',
		type: 'sidebar'
	});

	expect(getAllByText('HomePage')).toHaveLength(2);

	const sideBar = getByTestId('sidebar');
	expect(within(sideBar).getByText('go to madrid')).toBeInTheDocument();
	expect(within(sideBar).getByText('go to madrid')).not.toHaveClass('iroco-ui-button');
	expect(within(sideBar).getByText('go to madrid').href).toEqual('http://localhost/Madrid');
});

test('Should display one item of type link', () => {
	const cb = jest.fn();
	const { getByTestId, getAllByText } = render(Navigation, {
		navigationItems: [new NavigationItem('with callback', cb)],
		title: 'HomePage',
		type: 'sidebar'
	});

	expect(getAllByText('HomePage')).toHaveLength(2);

	const sideBar = getByTestId('sidebar');
	let menuItem = within(sideBar).getByText('with callback');
	expect(menuItem).not.toHaveClass('iroco-ui-button');
	expect(menuItem).not.toHaveClass('iroco-ui-button--small');
	expect(menuItem).not.toHaveClass('iroco-ui-button--success');
	expect(menuItem.href).toEqual('http://localhost/#');

	userEvent.click(menuItem);
	expect(cb).toHaveBeenCalled();
});

test('Should display one item as button', async () => {
	const { findByText } = render(Navigation, {
		navigationItems: [new NavigationItem('with callback', 'link', true)],
		title: 'HomePage',
		type: 'sidebar'
	});
	expect(await findByText('with callback')).toHaveClass('iroco-ui-button');
	expect(await findByText('with callback')).toHaveClass('iroco-ui-button--small');
	expect(await findByText('with callback')).toHaveClass('iroco-ui-button--success');
});
