/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import Alert from '../src/Alert.svelte';

test('Check render', () => {
  const { getByText } = render(Alert, { content: "foo" });
  const elem = getByText('foo');
  expect(elem).toBeInTheDocument();
  expect(elem).toHaveClass('alert')
});

test('Check render danger mode', () => {
  const { getByText } = render(Alert, { content: "foo", type : "danger" });
  const elem = getByText('foo');
  expect(elem).toBeInTheDocument();
  expect(elem).toHaveClass('alert--danger')
});


