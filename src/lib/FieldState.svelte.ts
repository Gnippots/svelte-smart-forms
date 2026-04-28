export function createFieldState(initialValue: unknown = null) {
  const state = $state({
    value: initialValue,
    initialValue,
    dirty: false,
    valid: true,
    blurred: false,
    errors: {} as Record<string, string>,
    addError(error: string, message: string) {
      this.errors = {
        ...this.errors,
        [error]: message
      };
      this.valid = false;
    },
    removeError(error: string) {
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
    setDirty(dirty: boolean) {
      this.dirty = dirty;
    },
    setValue(value: unknown) {
      this.value = value;
    },
    setInitialValue(value: unknown) {
      this.value = value;
      this.initialValue = value;
      this.dirty = false;
    }
  });

  return state;
}