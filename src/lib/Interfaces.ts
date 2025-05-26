import type { Writable } from 'svelte/store'

export interface Field {
    valid: boolean;
    errors: Record<string, string>;
    blurred: boolean;
    [key: string]: any;
  }

export type Error = Record<string, string>;

export interface CustomValidationRule {
  fieldName: string;
  errorCode: string;
  fn: () => string | null;
}

export interface FormStateStore {
    fields: Record<string, Field>;
    errors: Record<string, Error>;
    customRules: Array<CustomValidationRule>;
    dirty: boolean;
    valid: boolean;
    submitted: boolean;
}

export interface FormState {
    subscribe: Writable<FormStateStore>['subscribe'];
    set: Writable<FormStateStore>['set'];
    update: Writable<FormStateStore>['update'];
    addCustomRule: (fieldName: string, errorCode: string, fn: () => string | null) => void;
}

export interface FieldState {
  dirty: boolean;
  valid: boolean;
  blurred: boolean;
  initialValue: any;
  errors: Error;
  addError: (error: string, message: string) => void;
  removeError: (error: string) => void;
  blur: () => void;
  [key: string]: any;
}


export interface AddressComponents {
  types: string[];
  short_name: string;
}

export interface Place {
  address_components?: AddressComponents[];
}

export interface Address {
  [key: string]: string;
  unit_number: string;
  street_number: string;
  street_name: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  po_box: string;
}

export interface ComponentMap {
  [key: string]: keyof Address;  // This maps strings to valid Address keys
}