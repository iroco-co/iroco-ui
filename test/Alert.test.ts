import { fireEvent, render } from '@testing-library/svelte';
import { Alert, SlottedComponentWrapper } from '$lib/index';
import { vi } from 'vitest';

test('Check render', () => {
	const { getByText, container } = render(SlottedComponentWrapper, { Component: Alert });
	expect(getByText('Slot value')).toBeInTheDocument();
	expect(container.querySelector('.alert')).toBeInTheDocument();
});

test('Check render danger mode', () => {
	const { container } = render(Alert, { type: 'danger' });
	expect(container.querySelector('.alert')).toHaveClass('alert--danger');
});

test('Check close callback', () => {
	const onclose = vi.fn();
	const { container } = render(Alert, { type: 'danger', onclose });
	fireEvent.click(<Element>container.querySelector('.alert__close'));

	expect(onclose).toHaveBeenCalled();
});
