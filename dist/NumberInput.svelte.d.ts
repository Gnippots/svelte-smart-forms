import { type Snippet } from 'svelte';
import type { FormState } from './Interfaces';
interface Props {
    label?: string;
    value?: number | null;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    showValidation?: boolean;
    formState: FormState;
    classes?: string;
    onChange?: () => void;
    placeholder?: string;
    min?: number | null;
    max?: number | null;
    suffix?: Snippet;
}
declare const NumberInput: import("svelte").Component<Props, {}, "value">;
type NumberInput = ReturnType<typeof NumberInput>;
export default NumberInput;
