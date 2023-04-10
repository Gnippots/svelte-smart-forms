import { writable } from 'svelte/store';
import type { FormValidator, FormValidatorStore } from './Interfaces';

export function createFormValidator(): FormValidator {
  const store = writable<FormValidatorStore>({
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
  };
}