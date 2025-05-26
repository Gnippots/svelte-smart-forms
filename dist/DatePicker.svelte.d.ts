import type { FormState } from './Interfaces';
declare const DatePicker: import("svelte").Component<{
    label?: string;
    value?: Date | null;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState?: FormState | null;
    classes?: string;
    onChange?: any;
    placeholder?: string;
}, {}, "value">;
type DatePicker = ReturnType<typeof DatePicker>;
export default DatePicker;
