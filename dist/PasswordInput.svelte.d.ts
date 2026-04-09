import type { Snippet } from 'svelte';
import type { FormState } from './Interfaces';
import type { FullAutoFill } from 'svelte/elements';
interface Props {
    label?: string;
    value?: string;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState: FormState;
    classes?: string;
    onChange?: any;
    placeholder?: string;
    confirm_against?: string;
    showPasswordToggle?: Snippet;
    hidePasswordToggle?: Snippet;
    showValidation?: boolean;
    autocomplete?: FullAutoFill;
}
declare const PasswordInput: import("svelte").Component<Props, {}, "value">;
type PasswordInput = ReturnType<typeof PasswordInput>;
export default PasswordInput;
