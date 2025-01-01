import type { FormState } from './Interfaces';
interface Props {
    label?: string;
    value?: string;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    show_validation?: boolean;
    formState?: FormState | null;
    classes?: string;
    on_change?: () => void;
    on_keyup?: () => void;
    placeholder?: string;
}
declare const TextInput: import("svelte").Component<Props, {}, "value">;
type TextInput = ReturnType<typeof TextInput>;
export default TextInput;
