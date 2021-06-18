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
