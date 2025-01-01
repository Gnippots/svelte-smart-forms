import { SvelteComponent } from "svelte";
import type { FormState } from './Interfaces';
declare const __propDef: {
    props: {
        label?: string;
        value?: Date | null;
        required?: boolean;
        name?: string;
        disabled?: boolean;
        formState?: FormState | null;
        classes?: string;
        on_change?: () => void;
        placeholder?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DatePickerProps = typeof __propDef.props;
export type DatePickerEvents = typeof __propDef.events;
export type DatePickerSlots = typeof __propDef.slots;
export default class DatePicker extends SvelteComponent<DatePickerProps, DatePickerEvents, DatePickerSlots> {
}
export {};
