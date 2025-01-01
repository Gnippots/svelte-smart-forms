import { SvelteComponent } from "svelte";
import type { FormState } from './Interfaces';
declare const __propDef: {
    props: {
        label?: string;
        value?: number | null;
        required?: boolean;
        name?: string;
        disabled?: boolean;
        formState?: FormState | null;
        classes?: string;
        on_change?: () => void;
        placeholder?: string;
        min?: number | null;
        max?: number | null;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type NumberInputProps = typeof __propDef.props;
export type NumberInputEvents = typeof __propDef.events;
export type NumberInputSlots = typeof __propDef.slots;
export default class NumberInput extends SvelteComponent<NumberInputProps, NumberInputEvents, NumberInputSlots> {
}
export {};
