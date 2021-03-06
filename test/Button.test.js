/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/svelte';
import Button from '../src/Button.svelte';
import SlotedComponentWrapper from './SlottedComponentWrapper.svelte';

test('Check content', () => {
  const { getByRole, component, container } = render(Button, { type: '' });
  expect(getByRole('button')).toBeInTheDocument();
  const btn = container.querySelector('button');
  expect(component.node).toContainElement(btn);
});

test('Button slot', () => {
  const { getByText } = render(SlotedComponentWrapper, { Component: Button });
  expect(getByText('Slot value')).toBeInTheDocument();
});

test('Check if button is enabled innitially', () => {
  const { getByRole } = render(Button, { type: '' });
  expect(getByRole('button')).toBeEnabled();
});

test('Check if button is disabled when disabled parameter is true', () => {
  const disabled = true;
  const { container, getByRole } = render(Button, { type: '', disabled });
  expect(getByRole('button')).toBeDisabled();
  expect(container.querySelector('button').classList).toContain('disabled');
});

test('test onclick callback', () => {
  const callback = jest.fn();
  const { getByRole, component } = render(Button, { type: 'button' });
  component.$on('click', callback);

  fireEvent.click(getByRole('button'));

  expect(callback).toHaveBeenCalled();
});

test('Check if button has the class iroco-ui-button--danger if button kind is set to danger', () => {
  const kind = 'danger';
  const { container } = render(Button, { type: '', kind });
  expect(container.querySelector('button').classList).toContain('iroco-ui-button--danger');
});

test('Check if button has the class iroco-ui-button--regular if button kind is set to regular', () => {
  const kind = 'regular';
  const { container } = render(Button, { type: '', kind });
  expect(container.querySelector('button').classList).toContain('iroco-ui-button--regular');
  expect(container.querySelector('button').classList).not.toContain('iroco-ui-button--danger');
});
