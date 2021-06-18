import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import Button from '../src/Button.svelte';

test('Check content', () => {
  const { getByText } = render(Button);
  expect(getByText('Hello World!')).toBeInTheDocument();
});
