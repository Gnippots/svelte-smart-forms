import { writable } from 'svelte/store';

export function createFieldState () {
    let isDirty = $state(false);
    let initial_value = $state(null);
    let errors = $state<Record<string, string>>({});
    let valid = $state(false);
    let blurred = $state(false);

    return {
      get dirty() { return isDirty; },
      valid: false,
      blurred: false,
      initial_value,
      errors: {},
      add_error: (error: string, message: string) => {
        valid = false;
        errors[error] = message;
      },
      remove_error: (error: string) => {
        delete errors[error];
  
        if (Object.keys(errors).length === 0) {
          valid = true;
        }
      },
      blur: () => {
        blurred = true;
      },
    };
}