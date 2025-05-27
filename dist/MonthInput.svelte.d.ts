import type { FormState } from './Interfaces';
import 'air-datepicker/air-datepicker.css';
declare const MonthInput: import("svelte").Component<{
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
}, {}, "value">;
type MonthInput = ReturnType<typeof MonthInput>;
export default MonthInput;
