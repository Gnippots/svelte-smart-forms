export function createFieldState(initialValue = null) {
    const state = $state({
        value: initialValue,
        initialValue,
        dirty: false,
        valid: true,
        blurred: false,
        errors: {},
        addError(error, message) {
            this.errors = {
                ...this.errors,
                [error]: message
            };
            this.valid = false;
        },
        removeError(error) {
            if (!(error in this.errors)) {
                return;
            }
            const nextErrors = { ...this.errors };
            delete nextErrors[error];
            this.errors = nextErrors;
            this.valid = Object.keys(this.errors).length === 0;
        },
        resetValidation() {
            this.errors = {};
            this.valid = true;
        },
        blur() {
            this.blurred = true;
        },
        resetBlur() {
            this.blurred = false;
        },
        setDirty(dirty) {
            this.dirty = dirty;
        },
        setValue(value) {
            this.value = value;
        },
        setInitialValue(value) {
            this.value = value;
            this.initialValue = value;
            this.dirty = false;
        }
    });
    return state;
}
