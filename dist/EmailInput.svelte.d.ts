import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type EmailInputProps = typeof __propDef.props;
export type EmailInputEvents = typeof __propDef.events;
export type EmailInputSlots = typeof __propDef.slots;
export default class EmailInput extends SvelteComponentTyped<EmailInputProps, EmailInputEvents, EmailInputSlots> {
}
export {};
