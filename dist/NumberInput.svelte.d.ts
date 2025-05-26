import type { FormState } from './Interfaces';
type $$ComponentProps = {
    label: string;
    value: number | null;
    required: boolean;
    name: string;
    disabled?: boolean;
    showValidation?: boolean;
    formState: FormState;
    classes?: string;
    onChange?: () => void;
    placeholder?: string;
    min?: number | null;
    max?: number | null;
};
declare const NumberInput: import("svelte").Component<$$ComponentProps, {}, "value">;
type NumberInput = ReturnType<typeof NumberInput>;
export default NumberInput;
