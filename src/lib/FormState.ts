import { writable, type Writable } from 'svelte/store';
import type { FieldState, FormState, FormStateStore, CustomValidationRule, ValidationErrors } from './Interfaces';

function createInitialState(): FormStateStore {
  return {
    fields: {},
    errors: {},
    customRules: [],
    dirty: false,
    valid: true,
    submitted: false
  };
}

function applyCustomRules(fields: Record<string, FieldState>, customRules: Array<CustomValidationRule>) {
  for (const rule of customRules) {
    const field = fields[rule.fieldName];

    if (!field) {
      continue;
    }

    field.removeError(rule.errorCode);

    const errorMessage = rule.fn();
    if (errorMessage) {
      field.addError(rule.errorCode, errorMessage);
    }
  }
}

function recalculateState(state: FormStateStore): FormStateStore {
  applyCustomRules(state.fields, state.customRules);

  const errors: Record<string, ValidationErrors> = {};

  for (const [fieldName, field] of Object.entries(state.fields)) {
    if (Object.keys(field.errors).length > 0) {
      errors[fieldName] = { ...field.errors };
    }
  }

  return {
    ...state,
    errors,
    dirty: Object.values(state.fields).some((field) => field.dirty),
    valid: Object.keys(errors).length === 0
  };
}

export function createFormState(): FormState {
  const store: Writable<FormStateStore> = writable(createInitialState());

  const sync = (updater: (state: FormStateStore) => FormStateStore) => {
    store.update((state) => recalculateState(updater(state)));
  };

  return {
    subscribe: store.subscribe,
    set: (value: FormStateStore) => {
      store.set(recalculateState(value));
    },
    update: (updater: (value: FormStateStore) => FormStateStore) => {
      sync(updater);
    },
    addCustomRule: (fieldName: string, errorCode: string, fn: () => string | null) => {
      sync((state) => ({
        ...state,
        customRules: [
          ...state.customRules,
          {
            fieldName,
            errorCode,
            fn
          }
        ]
      }));
    },
    registerField: (fieldName: string, field: FieldState) => {
      sync((state) => ({
        ...state,
        fields: {
          ...state.fields,
          [fieldName]: field
        }
      }));
    },
    syncField: (fieldName: string, field: FieldState) => {
      sync((state) => ({
        ...state,
        fields: {
          ...state.fields,
          [fieldName]: field
        }
      }));
    },
    unregisterField: (fieldName: string) => {
      sync((state) => {
        const fields = { ...state.fields };
        delete fields[fieldName];

        return {
          ...state,
          fields
        };
      });
    },
    setSubmitted: (submitted: boolean) => {
      sync((state) => ({
        ...state,
        submitted
      }));
    }
  };
}