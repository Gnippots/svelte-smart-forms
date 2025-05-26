export function createFieldState() {
    const state = $state({
        initialValue: null,
        dirty: false,
        valid: true,
        blurred: false,
        errors: {},
        addError(error, message) {
            this.valid = false;
            this.errors[error] = message;
        },
        removeError(error) {
            delete this.errors[error];
            if (Object.keys(this.errors).length === 0) {
                this.valid = true;
            }
        },
        blur() {
            this.blurred = true;
        }
    });
    return state;
}
