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
    on_change?: (value: number | null) => void;
    placeholder?: string;
    min?: number | null;
    max?: number | null;
    currencySymbol?: string;
    prefix?: Snippet;
}
declare const CashInput: import("svelte").Component<Props, {}, "value">;
type CashInput = ReturnType<typeof CashInput>;
export default CashInput;
