/**
 * @jest-environment jsdom
*/
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent} from '@testing-library/svelte';
import RadioButton from '../src/RadioButton.svelte';
import RadioButtonTest from './RadioButtonTest.svelte'
//import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

test('Check radio label', () => {
    const label = 'Hello World!';
    const { getByText } = render(RadioButton, { value:'HelloWord!', label, name:'name'});
    expect(getByText(label)).toBeInTheDocument();
  });

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