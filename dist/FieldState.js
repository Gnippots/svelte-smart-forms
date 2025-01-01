import { writable } from 'svelte/store';
export function createFieldState() {
    const store = writable({
        'dirty': false,
        'valid': false,
        'initial_value': null,
        'errors': [],
    });
    return {
        'subscribe': store.subscribe,
        'set': store.set
    };
}
