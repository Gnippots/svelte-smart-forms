import { writable } from 'svelte/store';
export function createFieldState() {
    const store = writable({
        'dirty': false,
        'valid': false,
        'initialValue': null,
        'errors': [],
    });
    return {
        'subscribe': store.subscribe,
        'set': store.set
    };
}
