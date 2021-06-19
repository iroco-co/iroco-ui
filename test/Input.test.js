/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import Input from '../src/Input.svelte';

test('Check input label', () => {
  const label = 'Hello World!';
  const { getByText } = render(Input, { id:'test_label', label, type: 'text' });
  expect(getByText(label)).toBeInTheDocument();
});

test('Check input error', () => {
  const error = 'Hello World!';
  const { getByTestId } = render(Input, { id:'test_label', type: 'text', error });
  expect(getByTestId('error')).toBeInTheDocument();
});

test('Check input placeholder', () => {
  const placeholder = 'Hello World!';
  const { getByPlaceholderText} = render(Input, { id:'test_label', type: 'text', placeholder });
  expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
});

test('Check input field', () => {
  const type = 'text';
  const { getByRole} = render(Input, { id:'test_label', type });
  expect(getByRole('textbox')).toBeInTheDocument();
});