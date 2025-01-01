export declare function createFieldState(): {
    subscribe: (this: void, run: import("svelte/store").Subscriber<{
        dirty: boolean;
        valid: boolean;
        initial_value: null;
        errors: never[];
    }>, invalidate?: ((value?: {
        dirty: boolean;
        valid: boolean;
        initial_value: null;
        errors: never[];
    } | undefined) => void) | undefined) => import("svelte/store").Unsubscriber;
    set: (this: void, value: {
        dirty: boolean;
        valid: boolean;
        initial_value: null;
        errors: never[];
    }) => void;
};
