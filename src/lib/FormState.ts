import { writable } from 'svelte/store';
import type { FormState, FormStateStore, CustomValidationRule } from './Interfaces';

export function createFormState(): FormState {
  const store = writable<FormStateStore>({
    fields: {},
    errors: {},
    customRules: [],
    dirty: false,
    valid: false,
    submitted: false,
  });

  return {
    subscribe: store.subscribe,
    set: store.set,
    update: store.update,
    addCustomRule: (fieldName: string, errorCode: string, validate: () => string | null) => {
      store.update(state => {
        const rule: CustomValidationRule = {
          fieldName,
          errorCode,
          validate
        };
        return {
          ...state,
          customRules: [...state.customRules, rule]
        };
      });
    }
  };
}