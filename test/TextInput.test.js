/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import TextInput from '../src/TextInput.svelte';
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

test('Check input label', () => {
  const label = 'Hello World!';
  const { getByText } = render(TextInput, { id:'test_label', label, type: 'text' });
  expect(getByText(label)).toBeInTheDocument();
});

test('Check input error', () => {
  const error = 'Hello World!';
  const { getByTestId } = render(TextInput, { id:'test_label', type: 'text', error });
  expect(getByTestId('error')).toBeInTheDocument();
});

test('Check input type', () => {
  const { component } = render(TextInput, { id:'test_label', type: 'password'});
  expect(component.type).toBe("password");
});

test('Check input placeholder', () => {
  const placeholder = 'Hello World!';
  const { getByPlaceholderText} = render(TextInput, { id:'test_label', type: 'text', placeholder });
  expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
});

test('Check input field', () => {
  const type = 'text';
  const { getByRole} = render(TextInput, { id:'test_label', type });
  expect(getByRole('textbox')).toBeInTheDocument();
});

test('Check value for input text', () =>{
  render(TextInput, {id:'id', type: 'text', placeholder: 'myPlaceholder'})

  let myInput= screen.getByPlaceholderText('myPlaceholder')
  userEvent.type(myInput, 'blabla')

  expect(myInput.value).toBe('blabla')
});
