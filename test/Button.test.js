/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import Button from '../src/Button.svelte';

test('Check content', () => {
  const label = 'Hello World!';
  const { getByText } = render(Button, { label, type: '' });
  expect(getByText(label)).toBeInTheDocument();
});

test ('Check if button is enabled innitially', () =>{
  const label = 'Hello World!';
  const { getByText } = render(Button, { label, type: ''});
  expect(getByText(label)).toBeEnabled();
})

test ('Check if button is disabled when disabledi s changed to true', () =>{
  const label = 'Hello World!';
  const disabled = true
  const { getByText } = render(Button, { label, type: '', disabled});
  expect(getByText(label)).toBeDisabled();
})