import type { Snippet } from 'svelte';
import type { FormState } from './Interfaces';
interface Props {
    label?: string;
    value?: string;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState?: FormState | null;
    classes?: string;
    on_change?: any;
    placeholder?: string;
    confirm_against?: string;
    showPasswordToggle?: Snippet;
    hidePasswordToggle?: Snippet;
}
declare const PasswordInput: import("svelte").Component<Props, {}, "value">;
type PasswordInput = ReturnType<typeof PasswordInput>;
export default PasswordInput;
