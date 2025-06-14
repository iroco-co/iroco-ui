import { fireEvent, render } from '@testing-library/svelte';
import { Button, SlottedComponentWrapper } from '$lib/index';
import { vi } from 'vitest';

test('Check content', () => {
	const { getByRole } = render(Button, { type: '' });
	expect(getByRole('button')).toBeInTheDocument();
});

test('Button slot', () => {
	const { getByText } = render(SlottedComponentWrapper, { Component: Button });
	expect(getByText('Slot value')).toBeInTheDocument();
});

test('Check if button is enabled innitially', () => {
	const { getByRole } = render(Button, { type: '' });
	expect(getByRole('button')).toBeEnabled();
});

test('Check if button is disabled when disabled parameter is true', () => {
	const disabled = true;
	const { container, getByRole } = render(Button, { type: '', disabled });
	expect(getByRole('button')).toBeDisabled();
	expect(container.querySelector('button').classList.toString()).toContain('disabled');
});

test('test onclick callback', () => {
	const callback = vi.fn();
	const { getByRole } = render(Button, {
		props: { type: 'button', onclick: callback }
	});
	// component.$on('click', callback);

	fireEvent.click(getByRole('button'));

	expect(callback).toHaveBeenCalled();
});

test('Check if button has the class iroco-ui-button--danger if button kind is set to danger', () => {
	const kind = 'danger';
	const { container } = render(Button, { type: '', kind });
	expect(container.querySelector('button').classList.toString()).toContain(
		'iroco-ui-button--danger'
	);
});

test('Check if button has the class iroco-ui-button--regular if button kind is set to regular', () => {
	const kind = 'regular';
	const { container } = render(Button, { type: '', kind });
	expect(container.querySelector('button').classList.toString()).toContain(
		'iroco-ui-button--regular'
	);
	expect(container.querySelector('button').classList.toString()).not.toContain(
		'iroco-ui-button--danger'
	);
});

test('Test button formaction property', () => {
	const { container } = render(Button, { type: 'submit', formaction: '/foo' });
	expect(container.querySelector('button')).toHaveAttribute('formaction', '/foo');
});
