import { writable } from 'svelte/store';
function createInitialState() {
    return {
        fields: {},
        errors: {},
        customRules: [],
        dirty: false,
        valid: true,
        submitted: false
    };
}
function applyCustomRules(fields, customRules) {
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
function recalculateState(state) {
    applyCustomRules(state.fields, state.customRules);
    const errors = {};
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
export function createFormState() {
    const store = writable(createInitialState());
    const sync = (updater) => {
        store.update((state) => recalculateState(updater(state)));
    };
    return {
        subscribe: store.subscribe,
        set: (value) => {
            store.set(recalculateState(value));
        },
        update: (updater) => {
            sync(updater);
        },
        addCustomRule: (fieldName, errorCode, fn) => {
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
        registerField: (fieldName, field) => {
            sync((state) => ({
                ...state,
                fields: {
                    ...state.fields,
                    [fieldName]: field
                }
            }));
        },
        syncField: (fieldName, field) => {
            sync((state) => ({
                ...state,
                fields: {
                    ...state.fields,
                    [fieldName]: field
                }
            }));
        },
        unregisterField: (fieldName) => {
            sync((state) => {
                const fields = { ...state.fields };
                delete fields[fieldName];
                return {
                    ...state,
                    fields
                };
            });
        },
        setSubmitted: (submitted) => {
            sync((state) => ({
                ...state,
                submitted
            }));
        }
    };
}
