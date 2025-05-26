import { writable } from 'svelte/store';

export function createFieldState (initialValue: string | number) {

    return $state({
      initialValue,
      dirty: false,
      valid: false,
      blurred: false,
      errors: [],
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
    });
}