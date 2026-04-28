import type { Writable } from 'svelte/store';

export type ValidationErrors = Record<string, string>;

export interface CustomValidationRule {
  fieldName: string;
  errorCode: string;
  fn: () => string | null;
}

export interface FieldState {
  value: unknown;
  dirty: boolean;
  valid: boolean;
  blurred: boolean;
  initialValue: unknown;
  errors: ValidationErrors;
  addError: (error: string, message: string) => void;
  removeError: (error: string) => void;
  resetValidation: () => void;
  blur: () => void;
  resetBlur: () => void;
  setDirty: (dirty: boolean) => void;
  setValue: (value: unknown) => void;
  setInitialValue: (value: unknown) => void;
}

export type Field = FieldState;

export interface FormStateStore {
  fields: Record<string, FieldState>;
  errors: Record<string, ValidationErrors>;
  customRules: Array<CustomValidationRule>;
  dirty: boolean;
  valid: boolean;
  submitted: boolean;
}

export interface FormState extends Writable<FormStateStore> {
  addCustomRule: (fieldName: string, errorCode: string, fn: () => string | null) => void;
  registerField: (fieldName: string, field: FieldState) => void;
  syncField: (fieldName: string, field: FieldState) => void;
  unregisterField: (fieldName: string) => void;
  setSubmitted: (submitted: boolean) => void;
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
  [key: string]: keyof Address;
}