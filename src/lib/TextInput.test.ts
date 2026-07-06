import { fireEvent, render } from '@testing-library/svelte';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { createFormState } from './FormState';
import TextInput from './TextInput.svelte';

describe('TextInput', () => {
  it('registers its initial field state after render', async () => {
    const formState = createFormState();

    render(TextInput, {
      props: {
        name: 'text',
        value: 'initial',
        formState
      }
    });
    await tick();

    expect(get(formState).fields.text.value).toBe('initial');
    expect(get(formState).fields.text.dirty).toBe(false);
    expect(get(formState).valid).toBe(true);
  });

  it('syncs changed values and dirty state into form state', async () => {
    const formState = createFormState();
    const { container } = render(TextInput, {
      props: {
        name: 'text',
        value: 'initial',
        formState
      }
    });
    await tick();

    const input = container.querySelector('input[name="text"]');
    expect(input).toBeInstanceOf(HTMLInputElement);

    await fireEvent.input(input as HTMLInputElement, { target: { value: 'changed' } });
    await tick();

    expect(get(formState).fields.text.value).toBe('changed');
    expect(get(formState).fields.text.dirty).toBe(true);
  });

  it('keeps masked empty input as null when parser returns null', async () => {
    const formState = createFormState();
    const { container } = render(TextInput, {
      props: {
        name: 'amount',
        value: 1250,
        formState,
        parse: (inputValue: string) => (inputValue === '' ? null : Number(inputValue)),
        format: (value: string | number | null | undefined) => {
          return value === null || value === undefined ? '' : String(value);
        }
      }
    });
    await tick();

    const input = container.querySelector('input[name="amount"]');
    expect(input).toBeInstanceOf(HTMLInputElement);

    await fireEvent.input(input as HTMLInputElement, { target: { value: '' } });
    await tick();

    expect(get(formState).fields.amount.value).toBeNull();
    expect(get(formState).fields.amount.dirty).toBe(true);
  });
});
