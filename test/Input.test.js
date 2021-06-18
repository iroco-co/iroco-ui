/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import Input from '../src/Input.svelte';

test('Check content', () => {
  const label = 'Hello World!';
  const { getByText } = render(Input, { id:'test_label', label, type: 'text', error:'', warning:'' });
  expect(getByText(label)).toBeInTheDocument();
});
