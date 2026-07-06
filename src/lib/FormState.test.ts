import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { createFieldState } from './FieldState.svelte';
import { createFormState } from './FormState';

describe('createFormState', () => {
  it('registers and syncs fields into aggregate form state', () => {
    const formState = createFormState();
    const fieldState = createFieldState('initial');

    formState.registerField('name', fieldState);
    expect(get(formState).fields.name.value).toBe('initial');
    expect(get(formState).valid).toBe(true);
    expect(get(formState).dirty).toBe(false);

    fieldState.setValue('changed');
    fieldState.setDirty(true);
    fieldState.addError('required', 'This is required');
    formState.syncField('name', fieldState);

    const state = get(formState);
    expect(state.fields.name.value).toBe('changed');
    expect(state.fields.name.dirty).toBe(true);
    expect(state.errors.name).toEqual({ required: 'This is required' });
    expect(state.valid).toBe(false);
    expect(state.dirty).toBe(true);
  });

  it('adds and removes custom rule errors when synced', () => {
    const formState = createFormState();
    const fieldState = createFieldState(0);

    formState.registerField('quantity', fieldState);
    formState.addCustomRule('quantity', 'positive', () => {
      return Number(fieldState.value) > 0 ? null : 'Quantity must be positive';
    });

    expect(get(formState).errors.quantity).toEqual({
      positive: 'Quantity must be positive'
    });
    expect(get(formState).valid).toBe(false);

    fieldState.setValue(1);
    formState.syncField('quantity', fieldState);

    expect(get(formState).errors.quantity).toBeUndefined();
    expect(get(formState).fields.quantity.valid).toBe(true);
    expect(get(formState).valid).toBe(true);
  });

  it('removes fields from aggregate state when unregistered', () => {
    const formState = createFormState();
    const fieldState = createFieldState('');

    fieldState.addError('required', 'This is required');
    formState.registerField('name', fieldState);
    expect(get(formState).fields.name).toBeDefined();
    expect(get(formState).errors.name).toBeDefined();

    formState.unregisterField('name');

    expect(get(formState).fields.name).toBeUndefined();
    expect(get(formState).errors.name).toBeUndefined();
    expect(get(formState).valid).toBe(true);
  });
});
