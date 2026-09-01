import type { FormState } from './Interfaces';
interface Props {
    label?: string;
    value?: boolean;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    showValidation?: boolean;
    formState: FormState;
    classes?: string;
    onChange?: () => void;
}
declare const CheckBox: import("svelte").Component<Props, {}, "value">;
type CheckBox = ReturnType<typeof CheckBox>;
export default CheckBox;
