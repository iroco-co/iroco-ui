import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/svelte';
import Alert from '$lib/Alert.svelte';
import SlotedComponentWrapper from '$lib/SlottedComponentWrapper.svelte';

test('Check render', () => {
	const { getByText, container } = render(SlotedComponentWrapper, { Component: Alert });
	expect(getByText('Slot value')).toBeInTheDocument();
	expect(container.querySelector('.alert')).toBeInTheDocument();
});

test('Check render danger mode', () => {
	const { container } = render(Alert, { type: 'danger' });
	expect(container.querySelector('.alert')).toHaveClass('alert--danger');
});

test('Check close callback', () => {
	const callback = vi.fn();
	const { container } = render(Alert, { type: 'danger', callback });
	fireEvent.click(<Element>container.querySelector('.alert'));

	expect(callback).toHaveBeenCalled();
});
