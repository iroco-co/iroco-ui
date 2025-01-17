import { render } from '@testing-library/svelte';
import { NumberInput } from '$lib/index';
import { screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

test('Check number input label', () => {
	const label = 'Hello World!';
	const { getByText } = render(NumberInput, { id: 'test_id', label, type: 'number' });
	expect(getByText(label)).toBeInTheDocument();
});

test('Check number input error', () => {
	const error = 'Hello World!';
	const { getByTestId } = render(NumberInput, { id: 'test_id', error });
	expect(getByTestId('error')).toBeInTheDocument();
});

test('Check value for number input ', async () => {
	render(NumberInput, { id: 'test_id', placeholder: '1' });
	const myNumberInput = screen.getByPlaceholderText('1');
	await userEvent.type(myNumberInput, '5');

	expect(myNumberInput.value).toBe('5');
});

test('Check min attribute', async () => {
	const min = 1;
	const max = 10;
	render(NumberInput, { id: 'test_id', placeholder: '1', min: min, max: max });
	const myNumberInput = screen.getByPlaceholderText('1');

	await userEvent.type(myNumberInput, '0');
	expect(myNumberInput.value).toBeNull();
});

test('Check max attribute', async () => {
	const min = 1;
	const max = 10;
	render(NumberInput, { id: 'test_id', placeholder: '1', min: min, max: max });
	const myNumberInput = screen.getByPlaceholderText('1');

	await userEvent.type(myNumberInput, '11');
	expect(myNumberInput.value).toBeNull();
});
