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
    on_change?: any;
    on_keyup?: any;
    placeholder?: string;
}
declare const EmailInput: import("svelte").Component<Props, {}, "value">;
type EmailInput = ReturnType<typeof EmailInput>;
export default EmailInput;
