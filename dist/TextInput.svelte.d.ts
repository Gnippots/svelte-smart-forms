import type { FormState } from './Interfaces';
interface Props {
    label?: string;
    value?: string;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    showValidation?: boolean;
    formState?: FormState | null;
    classes?: string;
    onChange?: () => void;
    onKeyup?: () => void;
    placeholder?: string;
}
declare const TextInput: import("svelte").Component<Props, {}, "value">;
type TextInput = ReturnType<typeof TextInput>;
export default TextInput;
