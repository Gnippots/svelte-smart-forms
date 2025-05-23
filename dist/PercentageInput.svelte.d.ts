import { type Snippet } from 'svelte';
import type { FormState } from './Interfaces';
interface Props {
    label?: string;
    value?: number | null;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState?: FormState | null;
    classes?: string;
    on_change?: any;
    placeholder?: string;
    min?: number | null;
    max?: number | null;
    suffix?: Snippet;
}
declare const PercentageInput: import("svelte").Component<Props, {}, "value">;
type PercentageInput = ReturnType<typeof PercentageInput>;
export default PercentageInput;
