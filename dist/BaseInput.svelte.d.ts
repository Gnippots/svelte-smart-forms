import { SvelteComponentTyped } from "svelte";
import type { FormState, FieldState } from './Interfaces';
declare const __propDef: {
    props: {
        label?: string;
        value?: any;
        required?: boolean;
        disabled?: boolean;
        classes?: string;
        name?: string;
        show_validation?: boolean;
        placeholder?: string;
        formState?: FormState | null;
        on_change?: () => void;
        validation_functions?: Array<() => void>;
        fieldState?: FieldState;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        label: {};
        input: {};
        errors: {};
    };
};
export type BaseInputProps = typeof __propDef.props;
export type BaseInputEvents = typeof __propDef.events;
export type BaseInputSlots = typeof __propDef.slots;
export default class BaseInput extends SvelteComponentTyped<BaseInputProps, BaseInputEvents, BaseInputSlots> {
}
export {};
