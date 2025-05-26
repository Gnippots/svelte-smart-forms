import { writable, derived, type Writable } from 'svelte/store';
import type { FormState, FormStateStore, CustomValidationRule } from './Interfaces';

type BaseFormState = Omit<FormStateStore, 'valid' | 'errors'>;

export function createFormState(): FormState {
  const baseStore: Writable<BaseFormState> = writable({
    fields: {},
    customRules: [],
    dirty: false,
    submitted: false,
  });

  // Create a derived store that computes valid and errors
  const derivedStore = derived(baseStore, (state) => {
    let valid = true;
    const errors: Record<string, Record<string, string>> = {};

    // Check all fields
    for (const [fieldName, field] of Object.entries(state.fields)) {
      if (!field.valid) {
        valid = false;
        errors[fieldName] = field.errors;
      }
    }

    // Run custom validation rules
    state.customRules.forEach((rule) => {
      const errorMessage = rule.fn();
      if (errorMessage) {
        const field = state.fields[rule.fieldName];
        if (field) {
          field.addError(rule.errorCode, errorMessage);
          valid = false;
          errors[rule.fieldName] = field.errors;
        }
      } else {
        const field = state.fields[rule.fieldName];
        if (field) {
          field.removeError(rule.errorCode);
        }
      }
    });

    return {
      ...state,
      valid,
      errors
    };
  });

  return {
    subscribe: derivedStore.subscribe,
    set: (value: FormStateStore) => {
      const { valid, errors, ...baseValue } = value;
      baseStore.set(baseValue);
    },
    update: (updater: (value: FormStateStore) => FormStateStore) => {
      baseStore.update((baseValue) => {
        const currentValue = {
          ...baseValue,
          valid: true,
          errors: {}
        };
        const newValue = updater(currentValue);
        const { valid, errors, ...newBaseValue } = newValue;
        return newBaseValue;
      });
    },
    addCustomRule: (fieldName: string, errorCode: string, fn: () => string | null) => {
      baseStore.update(state => {
        const rule: CustomValidationRule = {
          fieldName,
          errorCode,
          fn: fn
        };
        return {
          ...state,
          customRules: [...state.customRules, rule]
        };
      });
    }
  };
}