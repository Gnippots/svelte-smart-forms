import type { FormState } from './Interfaces';
declare const Dropdown: import("svelte").Component<{
    label?: string;
    value?: any;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState?: FormState | null;
    classes?: string;
    options?: Array<string | {
        value: any;
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
    onChange?: any;
    placeholder?: string;
    onBlur?: any;
}, {}, "value">;
type Dropdown = ReturnType<typeof Dropdown>;
export default Dropdown;
