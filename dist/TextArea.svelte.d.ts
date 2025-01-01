import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TextAreaProps = typeof __propDef.props;
export type TextAreaEvents = typeof __propDef.events;
export type TextAreaSlots = typeof __propDef.slots;
export default class TextArea extends SvelteComponentTyped<TextAreaProps, TextAreaEvents, TextAreaSlots> {
}
export {};
