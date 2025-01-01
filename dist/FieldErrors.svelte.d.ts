import { SvelteComponent } from "svelte";
import type { FormState, Field } from './Interfaces';
declare const __propDef: {
    props: {
        formState?: FormState | null;
        field?: keyof Field | null;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type FieldErrorsProps = typeof __propDef.props;
export type FieldErrorsEvents = typeof __propDef.events;
export type FieldErrorsSlots = typeof __propDef.slots;
export default class FieldErrors extends SvelteComponent<FieldErrorsProps, FieldErrorsEvents, FieldErrorsSlots> {
}
export {};
