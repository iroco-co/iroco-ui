import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/svelte';
import Alert from '$lib/Alert.svelte';

test('Check render', () => {
	const { getByText } = render(Alert, { content: 'foo' });
	const elem = getByText('foo');
	expect(elem).toBeInTheDocument();
	expect(elem).toHaveClass('alert');
});

test('Check render danger mode', () => {
	const { getByText } = render(Alert, { content: 'foo', type: 'danger' });
	const elem = getByText('foo');
	expect(elem).toBeInTheDocument();
	expect(elem).toHaveClass('alert--danger');
});

test('Check close callback', () => {
	const callback = vi.fn();
	const { getByText } = render(Alert, { content: 'foo', type: 'danger', callback });
	fireEvent.click(getByText('foo'));

	expect(callback).toHaveBeenCalled();
});
