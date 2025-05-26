import { type Snippet } from 'svelte';
import type { FormState, FieldState } from './Interfaces';
declare const BaseInput: import("svelte").Component<{
    label: string;
    value: any;
    required: boolean;
    disabled?: boolean;
    classes: string;
    name: string;
    showValidation?: boolean;
    placeholder?: string;
    formState: FormState;
    onChange?: () => void;
    validationFunctions?: Array<() => void>;
    fieldState: FieldState;
    input?: Snippet;
}, {}, "value" | "fieldState">;
type BaseInput = ReturnType<typeof BaseInput>;
export default BaseInput;
