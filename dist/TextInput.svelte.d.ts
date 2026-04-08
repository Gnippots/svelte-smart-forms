import type { FormState } from './Interfaces';
import type { FullAutoFill } from 'svelte/elements';
interface Props {
    label?: string;
    value?: string;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    showValidation?: boolean;
    formState: FormState;
    classes?: string;
    onChange?: () => void;
    onKeyup?: () => void;
    placeholder?: string;
    autocomplete?: FullAutoFill;
}
declare const TextInput: import("svelte").Component<Props, {}, "value">;
type TextInput = ReturnType<typeof TextInput>;
export default TextInput;
