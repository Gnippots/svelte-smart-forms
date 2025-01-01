import { SvelteComponentTyped } from "svelte";
import type { FormState } from './Interfaces';
declare const __propDef: {
    props: {
        label?: string;
        value?: boolean;
        required?: boolean;
        name?: string;
        disabled?: boolean;
        formState?: FormState | null;
        on_change?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        label: {};
    };
};
export type CheckBoxProps = typeof __propDef.props;
export type CheckBoxEvents = typeof __propDef.events;
export type CheckBoxSlots = typeof __propDef.slots;
export default class CheckBox extends SvelteComponentTyped<CheckBoxProps, CheckBoxEvents, CheckBoxSlots> {
}
export {};
