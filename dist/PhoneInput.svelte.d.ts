import { SvelteComponent } from "svelte";
import type { FormState } from './Interfaces';
declare const __propDef: {
    props: {
        label?: string;
        value?: string;
        required?: boolean;
        name?: string;
        disabled?: boolean;
        show_validation?: boolean;
        formState?: FormState | null;
        classes?: string;
        on_change?: () => void;
        on_keyup?: () => void;
        placeholder?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type PhoneInputProps = typeof __propDef.props;
export type PhoneInputEvents = typeof __propDef.events;
export type PhoneInputSlots = typeof __propDef.slots;
export default class PhoneInput extends SvelteComponent<PhoneInputProps, PhoneInputEvents, PhoneInputSlots> {
}
export {};
