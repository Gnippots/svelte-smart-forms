import type { FormState } from './Interfaces';
interface Props {
    label?: string;
    value?: string;
    required?: boolean;
    rows?: number;
    name?: string;
    disabled?: boolean;
    formState?: FormState | null;
    classes?: string;
    onChange?: any;
    placeholder?: string;
}
declare const TextArea: import("svelte").Component<Props, {}, "value">;
type TextArea = ReturnType<typeof TextArea>;
export default TextArea;
