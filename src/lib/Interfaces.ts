import type { Writable } from 'svelte/store'

export interface Field {
    valid: boolean;
    errors: Record<string, string>;
    blurred: boolean;
    [key: string]: any;
  }

export type Error = Record<string, string>;

export interface FormValidatorStore {
    fields: Record<string, Field>;
    errors: Record<string, Error>;
    customRules: Array<() => void>;
    dirty: boolean;
    valid: boolean;
    submitted: boolean;
}

export interface FormValidator {
    subscribe: Writable<FormValidatorStore>['subscribe'];
    set: Writable<FormValidatorStore>['set'];
    update: Writable<FormValidatorStore>['update'];
}

export interface FieldValidator {
  dirty: boolean;
  valid: boolean;
  blurred: boolean;
  initial_value: any;
  errors: Error;
  add_error: (error: string, message: string) => void;
  remove_error: (error: string) => void;
  blur: () => void;
  [key: string]: any;
}