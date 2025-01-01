import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type FieldErrorsProps = typeof __propDef.props;
export type FieldErrorsEvents = typeof __propDef.events;
export type FieldErrorsSlots = typeof __propDef.slots;
export default class FieldErrors extends SvelteComponentTyped<FieldErrorsProps, FieldErrorsEvents, FieldErrorsSlots> {
}
export {};
