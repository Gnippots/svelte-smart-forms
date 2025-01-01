import { SvelteComponent } from "svelte";
import type { FormState } from './Interfaces';
declare const __propDef: {
    props: {
        label?: string;
        value?: string;
        required?: boolean;
        rows?: number;
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
export type TextAreaProps = typeof __propDef.props;
export type TextAreaEvents = typeof __propDef.events;
export type TextAreaSlots = typeof __propDef.slots;
export default class TextArea extends SvelteComponent<TextAreaProps, TextAreaEvents, TextAreaSlots> {
}
export {};
