import type { FormState } from './Interfaces';
import type { FullAutoFill } from 'svelte/elements';
declare const Dropdown: import("svelte").Component<{
    label?: string;
    value?: string;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState: FormState;
    classes?: string;
    options?: Array<string | {
        value: string;
        name: string;
        disabled?: boolean;
    }>;
    optionGroups?: Array<{
        label: string;
        options: Array<string | {
            value: string;
            name: string;
            disabled?: boolean;
        }>;
    }>;
    onChange?: () => void;
    placeholder?: string;
    onBlur?: () => void;
    showValidation?: boolean;
    autocomplete?: FullAutoFill;
}, {}, "value">;
type Dropdown = ReturnType<typeof Dropdown>;
export default Dropdown;
