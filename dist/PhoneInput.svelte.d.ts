import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PhoneInputProps = typeof __propDef.props;
export type PhoneInputEvents = typeof __propDef.events;
export type PhoneInputSlots = typeof __propDef.slots;
export default class PhoneInput extends SvelteComponentTyped<PhoneInputProps, PhoneInputEvents, PhoneInputSlots> {
}
export {};
