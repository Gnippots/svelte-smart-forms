import { SvelteComponent } from "svelte";
import type { FormState } from './Interfaces';
declare const __propDef: {
    props: {
        formState?: FormState | null;
        onSubmit?: (() => void) | null;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type FormProps = typeof __propDef.props;
export type FormEvents = typeof __propDef.events;
export type FormSlots = typeof __propDef.slots;
export default class Form extends SvelteComponent<FormProps, FormEvents, FormSlots> {
}
export {};
