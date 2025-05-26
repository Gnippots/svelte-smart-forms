import type { FormState } from './Interfaces';
interface Props {
    label?: string;
    value?: number | null;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState?: FormState | null;
    classes?: string;
    onChange?: any;
    placeholder?: string;
    min?: number | null;
    max?: number | null;
}
declare const NumberInput: import("svelte").Component<Props, {}, "value">;
type NumberInput = ReturnType<typeof NumberInput>;
export default NumberInput;
