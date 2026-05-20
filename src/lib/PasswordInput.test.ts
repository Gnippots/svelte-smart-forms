import { render } from '@testing-library/svelte';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { createFormState } from './FormState';
import PasswordInput from './PasswordInput.svelte';

describe('PasswordInput', () => {
  it('revalidates confirmation when confirm_against changes', async () => {
    const formState = createFormState();
    const { rerender } = render(PasswordInput, {
      props: {
        name: 'password2',
        value: 'secret',
        confirm_against: 'secret',
        formState
      }
    });
    await tick();

    expect(get(formState).fields.password2.errors).toEqual({});
    expect(get(formState).valid).toBe(true);

    await rerender({
      name: 'password2',
      value: 'secret',
      confirm_against: 'changed',
      formState
    });
    await tick();

    expect(get(formState).fields.password2.errors).toEqual({
      confirm: 'Passwords do not match'
    });
    expect(get(formState).valid).toBe(false);
  });
});
