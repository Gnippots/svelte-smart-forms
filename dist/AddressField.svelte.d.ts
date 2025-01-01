import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AddressFieldProps = typeof __propDef.props;
export type AddressFieldEvents = typeof __propDef.events;
export type AddressFieldSlots = typeof __propDef.slots;
export default class AddressField extends SvelteComponentTyped<AddressFieldProps, AddressFieldEvents, AddressFieldSlots> {
}
export {};
