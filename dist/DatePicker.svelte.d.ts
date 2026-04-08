import type { FormState } from './Interfaces';
import 'air-datepicker/air-datepicker.css';
declare const DatePicker: import("svelte").Component<{
    label?: string;
    value?: string | Date | null;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState: FormState;
    classes?: string;
    onChange?: any;
    placeholder?: string;
    showValidation?: boolean;
    container?: string;
    minDate?: Date;
    maxDate?: Date;
}, {}, "value">;
type DatePicker = ReturnType<typeof DatePicker>;
export default DatePicker;
