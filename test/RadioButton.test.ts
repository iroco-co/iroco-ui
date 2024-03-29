import { render } from '@testing-library/svelte';
import RadioButton from '$lib/RadioButton.svelte';
import RadioButtonTest from '$lib/RadioButtonTest.svelte';
import userEvent from '@testing-library/user-event';
import SlotedComponentWrapper from '$lib/SlottedComponentWrapper.svelte';

test('Check radio label', () => {
	const { getByRole } = render(RadioButton, { value: 'HelloWord!', name: 'name' });
	expect(getByRole('radio')).toBeInTheDocument();
});

test('Button slot', () => {
	const { getByText } = render(SlotedComponentWrapper, { Component: RadioButton });
	expect(getByText('Slot value')).toBeInTheDocument();
});

test('Check radio change value', async () => {
	const { component, getByLabelText } = render(RadioButtonTest, { group: 'test' });

	const second = getByLabelText('Second');

	await userEvent.click(second);
	expect(second.checked).toBe(true);
	expect(component.group).toBe('second');

	await userEvent.click(getByLabelText('First'));
	expect(second.checked).toBe(false);
	expect(component.group).toBe('first');
});

test('Check radio button initial value', () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { component, getByLabelText } = render(RadioButtonTest, { group: 'first' });

	expect(getByLabelText('First').checked).toBe(true);
});
