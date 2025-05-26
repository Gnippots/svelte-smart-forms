import type { FormState } from './Interfaces';
type $$ComponentProps = {
    label: string;
    value: string;
    required: boolean;
    name: string;
    disabled?: boolean;
    showValidation?: boolean;
    formState: FormState;
    classes?: string;
    onChange?: () => void;
    onKeyup?: () => void;
    placeholder?: string;
};
declare const EmailInput: import("svelte").Component<$$ComponentProps, {}, "value">;
type EmailInput = ReturnType<typeof EmailInput>;
export default EmailInput;
