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
    onChange?: any;
    onKeyup?: any;
    placeholder?: string;
}
declare const EmailInput: import("svelte").Component<Props, {}, "value">;
type EmailInput = ReturnType<typeof EmailInput>;
export default EmailInput;
