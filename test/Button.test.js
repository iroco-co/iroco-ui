/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, getByRole, render} from '@testing-library/svelte'
import Button from '../src/Button.svelte'
import SlotedComponentWrapper from './SlottedComponentWrapper.svelte'

test('Check content', () => {
  const { getByRole } = render(Button, { type: '' });
  expect(getByRole('button')).toBeInTheDocument();
});

test('Button slot', () => {
  const { getByText } = render(SlotedComponentWrapper, {Component: Button})
  expect(getByText('Slot value')).toBeInTheDocument();
})

test ('Check if button is enabled innitially', () =>{
  const { getByRole } = render(Button, { type: ''});
  expect(getByRole('button')).toBeEnabled();
})

test ('Check if button is disabled when disabledi s changed to true', () =>{
  const disabled = true;
  const { container, getByRole } = render(Button, { type: '', disabled});
  expect(getByRole('button')).toBeDisabled();
  expect(container.querySelector('button').classList.contains('disabled')).toBe(true);
})

test ('test onclick callback', () => {
  const callback = jest.fn()
  const { getByRole, component } = render(Button, { type: 'button'})
  component.$on("click", callback);

  fireEvent.click(getByRole("button"));

  expect(callback).toHaveBeenCalled();
})