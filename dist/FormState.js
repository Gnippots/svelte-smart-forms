import { writable } from 'svelte/store';
export function createFormState() {
    const store = writable({
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
