import type { Writable } from 'svelte/store';
export interface Field {
    valid: boolean;
    errors: Record<string, string>;
    blurred: boolean;
    [key: string]: any;
}
export type Error = Record<string, string>;
export interface FormStateStore {
    fields: Record<string, Field>;
    errors: Record<string, Error>;
    customRules: Array<() => void>;
    dirty: boolean;
    valid: boolean;
    submitted: boolean;
}
export interface FormState {
    subscribe: Writable<FormStateStore>['subscribe'];
    set: Writable<FormStateStore>['set'];
    update: Writable<FormStateStore>['update'];
}
export interface FieldState {
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
