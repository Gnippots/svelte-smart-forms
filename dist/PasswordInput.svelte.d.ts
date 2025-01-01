import { SvelteComponent } from "svelte";
import type { FormState } from './Interfaces';
declare const __propDef: {
    props: {
        label?: string;
        value?: string;
        required?: boolean;
        name?: string;
        disabled?: boolean;
        formState?: FormState | null;
        classes?: string;
        on_change?: () => void;
        placeholder?: string;
        confirm_against?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type PasswordInputProps = typeof __propDef.props;
export type PasswordInputEvents = typeof __propDef.events;
export type PasswordInputSlots = typeof __propDef.slots;
export default class PasswordInput extends SvelteComponent<PasswordInputProps, PasswordInputEvents, PasswordInputSlots> {
}
export {};
