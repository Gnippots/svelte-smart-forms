export declare function createFieldState(initialValue?: unknown): {
    value: unknown;
    initialValue: unknown;
    dirty: boolean;
    valid: boolean;
    blurred: boolean;
    errors: Record<string, string>;
    addError(error: string, message: string): void;
    removeError(error: string): void;
    resetValidation(): void;
    blur(): void;
    resetBlur(): void;
    setDirty(dirty: boolean): void;
    setValue(value: unknown): void;
    setInitialValue(value: unknown): void;
};
