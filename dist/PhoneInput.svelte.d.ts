import type { FormState } from './Interfaces';
interface Props {
    label?: string;
    value?: string;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    showValidation?: boolean;
    formState: FormState;
    classes?: string;
    onChange?: any;
    onKeyup?: any;
    placeholder?: string;
}
declare const PhoneInput: import("svelte").Component<Props, {}, "value">;
type PhoneInput = ReturnType<typeof PhoneInput>;
export default PhoneInput;
