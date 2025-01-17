import { render } from '@testing-library/svelte';
import { RadioButton, SlottedComponentWrapper } from '$lib/index';

test('Check radio label', () => {
	const { getByRole } = render(RadioButton, { value: 'HelloWord!', name: 'name' });
	expect(getByRole('radio')).toBeInTheDocument();
});

test('Button slot', () => {
	const { getByText } = render(SlottedComponentWrapper, { Component: RadioButton });
	expect(getByText('Slot value')).toBeInTheDocument();
});

// RadioButtonTest was :
// <svelte:options accessors={true} />
//
// <script lang="ts">
// 	import RadioButton from './RadioButton.svelte';
// 	export let group = '';
// </script>
//
// <form>
// 	<RadioButton bind:group value="first" name="name" checked>First</RadioButton>
// 	<RadioButton bind:group value="second" name="name">Second</RadioButton>
// </form>

//
// test('Check radio change value', async () => {
// 	const { component, getByLabelText } = render(RadioButtonTest, { group: 'test' });
//
// 	const second = getByLabelText('Second');
//
// 	await userEvent.click(second);
// 	expect(second.checked).toBe(true);
// 	expect(component.group).toBe('second');
//
// 	await userEvent.click(getByLabelText('First'));
// 	expect(second.checked).toBe(false);
// 	expect(component.group).toBe('first');
// });
//
// test('Check radio button initial value', () => {
// 	// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 	const { component, getByLabelText } = render(RadioButtonTest, { group: 'first' });
//
// 	expect(getByLabelText('First').checked).toBe(true);
// });
