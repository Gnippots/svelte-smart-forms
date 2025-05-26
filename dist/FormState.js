import { writable, derived } from 'svelte/store';
export function createFormState() {
    const baseStore = writable({
        fields: {},
        customRules: [],
        dirty: false,
        submitted: false,
    });
    // Create a derived store that computes valid and errors
    const derivedStore = derived(baseStore, (state) => {
        let valid = true;
        const errors = {};
        // Check all fields
        for (const [fieldName, field] of Object.entries(state.fields)) {
            if (!field.valid) {
                valid = false;
                errors[fieldName] = field.errors;
            }
        }
        // Run custom validation rules
        state.customRules.forEach((rule) => {
            const errorMessage = rule.fn();
            if (errorMessage) {
                const field = state.fields[rule.fieldName];
                if (field) {
                    field.addError(rule.errorCode, errorMessage);
                    valid = false;
                    errors[rule.fieldName] = field.errors;
                }
            }
            else {
                const field = state.fields[rule.fieldName];
                if (field) {
                    field.removeError(rule.errorCode);
                }
            }
        });
        return {
            ...state,
            valid,
            errors
        };
    });
    return {
        subscribe: derivedStore.subscribe,
        set: (value) => {
            const { valid, errors, ...baseValue } = value;
            baseStore.set(baseValue);
        },
        update: (updater) => {
            baseStore.update((baseValue) => {
                const currentValue = {
                    ...baseValue,
                    valid: true,
                    errors: {}
                };
                const newValue = updater(currentValue);
                const { valid, errors, ...newBaseValue } = newValue;
                return newBaseValue;
            });
        },
        addCustomRule: (fieldName, errorCode, fn) => {
            baseStore.update(state => {
                const rule = {
                    fieldName,
                    errorCode,
                    fn: fn
                };
                return {
                    ...state,
                    customRules: [...state.customRules, rule]
                };
            });
        }
    };
}
