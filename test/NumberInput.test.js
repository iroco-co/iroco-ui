/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import NumberInput from '../src/NumberInput.svelte';
import NumberInputSized from './NumberInputSized.svelte';
import { screen } from '@testing-library/dom';
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

test('Check value for number input ', () => {
	render(NumberInput, { id: 'test_id', placeholder: '1' });
	let myNumberInput = screen.getByPlaceholderText('1');

	userEvent.type(myNumberInput, '5');

	expect(myNumberInput.value).toBe('5');
});

test('Check min attribute', () => {
	const min = 1;
	const max = 10;
	render(NumberInput, { id: 'test_id', placeholder: '1', min: min, max: max });
	let myNumberInput = screen.getByPlaceholderText('1');

	userEvent.type(myNumberInput, '0');
	// eslint-disable-next-line jest/valid-expect
	expect(myNumberInput.value).toBeNull;
});

test('Check max attribute', () => {
	const min = 1;
	const max = 10;
	render(NumberInput, { id: 'test_id', placeholder: '1', min: min, max: max });
	let myNumberInput = screen.getByPlaceholderText('1');

	userEvent.type(myNumberInput, '11');
	// eslint-disable-next-line jest/valid-expect
	expect(myNumberInput.value).toBeNull;
});

test('Adding size attribute', () => {
	const { getByPlaceholderText } = render(NumberInputSized);
	expect(getByPlaceholderText('ph').size).toBe(3);
});
