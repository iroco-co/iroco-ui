/**
 * @jest-environment jsdom
*/
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent} from '@testing-library/svelte';
import RadioButton from '../src/RadioButton.svelte';
import RadioButtonTest from './RadioButtonTest.svelte'
import userEvent from '@testing-library/user-event'
import SlotedComponentWrapper from "./SlottedComponentWrapper.svelte";

test('Check radio label', () => {
  const { getByRole } = render(RadioButton, { value:'HelloWord!', name:'name'});
  expect(getByRole('radio')).toBeInTheDocument();
});

test('Button slot', () => {
  const { getByText } = render(SlotedComponentWrapper, {Component: RadioButton})
  expect(getByText('Slot value')).toBeInTheDocument();
})

test('Check radio change value', () =>{
  const { component, getByLabelText } = render(RadioButtonTest, {group: 'test'});

  const second = getByLabelText('Second')

  userEvent.click(second);
  expect(second.checked).toBe(true)
  expect(component.group).toBe('second')

  userEvent.click(getByLabelText('First'))
  expect(second.checked).toBe(false)
  expect(component.group).toBe('first')

})  

test ('Check radio button initial value', () => {
  const { component, getByLabelText} = render(RadioButtonTest, {group:'first'})

  expect(getByLabelText('First').checked).toBe(true)
})