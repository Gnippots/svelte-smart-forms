export declare function createFieldState(): {
    initialValue: null;
    dirty: boolean;
    valid: boolean;
    blurred: boolean;
    errors: Record<string, string>;
    addError(error: string, message: string): void;
    removeError(error: string): void;
    blur(): void;
};
