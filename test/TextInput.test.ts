import { render, screen } from '@testing-library/svelte';
import { TextInput } from '$lib/index';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

test('Check input label', () => {
	const label = 'Hello World!';
	const { getByText } = render(TextInput, { id: 'test_label', label, type: 'text' });
	expect(getByText(label)).toBeInTheDocument();
});

test('Check input error', () => {
	const error = 'Hello World!';
	const { container, getByTestId } = render(TextInput, { id: 'test_label', type: 'text', error });
	expect(getByTestId('error')).toBeInTheDocument();
	expect(container.querySelector('input').classList.toString()).toContain('error');
});

test('Check input html error', () => {
	const error = '<span class="test-span">Hello world</span>';
	const { container } = render(TextInput, {
		id: 'test_label',
		type: 'text',
		htmlError: true,
		error
	});
	expect(container.querySelector('span.test-span')).toBeDefined();
});

test('Check input type', () => {
	const { container } = render(TextInput, { id: 'test_label', type: 'password' });
	expect(container.querySelector('input').type).toBe('password');
});

test('Check input placeholder', () => {
	const placeholder = 'Hello World!';
	const { getByPlaceholderText } = render(TextInput, {
		id: 'test_label',
		type: 'text',
		placeholder
	});
	expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
});

test('Check input field', () => {
	const type = 'text';
	const { getByRole } = render(TextInput, { id: 'test_label', type });
	expect(getByRole('textbox')).toBeInTheDocument();
});

test('Check value for input text', async () => {
	render(TextInput, { id: 'id', type: 'text', placeholder: 'myPlaceholder' });

	const myInput = screen.getByPlaceholderText('myPlaceholder');
	await userEvent.type(myInput, 'blabla');

	expect(myInput.value).toBe('blabla');
});

test('Check readonly propriety', async () => {
	const readonly = true;
	render(TextInput, { id: 'id', type: 'text', placeholder: 'blabla', readonly });

	const myInput = screen.getByPlaceholderText('blabla');
	await userEvent.type(myInput, 'blibli');

	expect(myInput.value).not.toBe('blibli');
});

test('Check autocomplete propriety', async () => {
	const autocomplete = 'password-change';
	render(TextInput, { id: 'id', type: 'text', placeholder: 'blabla', autocomplete });

	const myInput = screen.getByPlaceholderText('blabla');
	expect(myInput['autocomplete']).toEqual('password-change');
});

test('Focus on textInput calls callback property', () => {
	const onfocus = vi.fn();
	const onblur = vi.fn();
	const { container } = render(TextInput, { id: 'id', type: 'text', onfocus, onblur });

	container.querySelector('input').focus();
	container.querySelector('input').blur();

	expect(onfocus).toBeCalledTimes(1);
	expect(onblur).toBeCalledTimes(1);
});
