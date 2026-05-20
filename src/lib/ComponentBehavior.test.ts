import { fireEvent } from '@testing-library/svelte';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import CheckBox from './CheckBox.svelte';
import Dropdown from './Dropdown.svelte';
import EmailInput from './EmailInput.svelte';
import NumberInput from './NumberInput.svelte';
import PhoneInput from './PhoneInput.svelte';
import TextArea from './TextArea.svelte';
import TextInput from './TextInput.svelte';
import { blur, changeValue, fieldErrors, expectField, inputValue, renderField } from './test-helpers';

describe('simple input components', () => {
  it('applies required validation consistently', async () => {
    const { formState } = await renderField(TextInput, {
      name: 'requiredText',
      value: '',
      required: true
    });

    expect(fieldErrors(formState, 'requiredText')).toEqual({ required: 'This is required' });
    expect(get(formState).valid).toBe(false);
  });

  it('validates email format and clears the error for valid email addresses', async () => {
    const { container, formState } = await renderField(EmailInput, {
      name: 'email',
      value: 'not-an-email'
    });

    expect(fieldErrors(formState, 'email')).toEqual({ email: 'Invalid Email Address' });

    const input = container.querySelector('input[name="email"]');
    expect(input).toBeInstanceOf(HTMLInputElement);

    await inputValue(input as HTMLInputElement, 'user@example.com');
    expect(fieldErrors(formState, 'email')).toEqual({});
    expect(get(formState).valid).toBe(true);
  });

  it('syncs number values and renders min and max attributes', async () => {
    const { container, formState } = await renderField(NumberInput, {
      name: 'quantity',
      value: 5,
      min: 0,
      max: 10
    });

    const input = container.querySelector('input[name="quantity"]');
    expect(input).toBeInstanceOf(HTMLInputElement);
    expect(input?.getAttribute('type')).toBe('number');
    expect(input?.getAttribute('min')).toBe('0');
    expect(input?.getAttribute('max')).toBe('10');

    await inputValue(input as HTMLInputElement, '7');
    expectField(formState, 'quantity', 7);
  });

  it('renders dropdown options and syncs selected values', async () => {
    const { container, formState } = await renderField(Dropdown, {
      name: 'choice',
      value: '',
      placeholder: 'Choose one',
      required: true,
      options: ['One', { value: 'two', name: 'Two', disabled: true }],
      optionGroups: [
        {
          label: 'Grouped',
          options: [{ value: 'three', name: 'Three' }]
        }
      ]
    });

    const select = container.querySelector('select[name="choice"]');
    expect(select).toBeInstanceOf(HTMLSelectElement);
    expect(container.querySelector('option[value=""]')?.textContent).toBe('Choose one');
    expect(container.querySelector('option[value="two"]')?.hasAttribute('disabled')).toBe(true);
    expect(container.querySelector('optgroup[label="Grouped"]')).toBeTruthy();

    await changeValue(select as HTMLSelectElement, 'three');
    expectField(formState, 'choice', 'three');
  });

  it('syncs checkbox checked state and required validation', async () => {
    const { container, formState } = await renderField(CheckBox, {
      name: 'accepted',
      value: false,
      required: true
    });

    expect(fieldErrors(formState, 'accepted')).toEqual({ required: 'This is required' });

    const input = container.querySelector('input[name="accepted"]');
    expect(input).toBeInstanceOf(HTMLInputElement);

    await fireEvent.click(input as HTMLInputElement);
    await tick();

    expectField(formState, 'accepted', true);
    expect(fieldErrors(formState, 'accepted')).toEqual({});
  });

  it('syncs textarea values and renders rows', async () => {
    const { container, formState } = await renderField(TextArea, {
      name: 'notes',
      value: 'initial',
      rows: 3
    });

    const textarea = container.querySelector('textarea[name="notes"]');
    expect(textarea).toBeInstanceOf(HTMLTextAreaElement);
    expect(textarea?.getAttribute('rows')).toBe('3');

    await inputValue(textarea as HTMLTextAreaElement, 'updated');
    expectField(formState, 'notes', 'updated');
  });

  it('syncs phone values and defaults autocomplete to tel', async () => {
    const { container, formState } = await renderField(PhoneInput, {
      name: 'phone',
      value: ''
    });

    const input = container.querySelector('input[name="phone"]');
    expect(input).toBeInstanceOf(HTMLInputElement);
    expect(input?.getAttribute('autocomplete')).toBe('tel');

    await inputValue(input as HTMLInputElement, '0400000000');
    expectField(formState, 'phone', '0400000000');
  });

  it('syncs blur state for simple text inputs', async () => {
    const { container, formState } = await renderField(TextInput, {
      name: 'text',
      value: 'initial'
    });

    const input = container.querySelector('input[name="text"]');
    expect(input).toBeInstanceOf(HTMLInputElement);

    await blur(input as HTMLInputElement);
    expect(get(formState).fields.text.blurred).toBe(true);
  });
});
