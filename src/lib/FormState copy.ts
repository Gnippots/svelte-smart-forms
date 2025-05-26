import { writable } from 'svelte/store';
import type { FormState, FormStateStore } from './Interfaces';

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
  };
}