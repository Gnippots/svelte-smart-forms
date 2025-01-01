import { SvelteComponent } from "svelte";
import type { FormState } from './Interfaces';
declare const __propDef: {
    props: {
        label?: string;
        value?: string | null;
        required?: boolean;
        name?: string;
        disabled?: boolean;
        formState?: FormState | null;
        classes?: string;
        options?: Array<string | {
            value: string;
            name: string;
            disabled?: boolean;
        }>;
        option_groups?: Array<{
            label: string;
            options: Array<string | {
                value: string;
                name: string;
                disabled?: boolean;
            }>;
        }>;
        on_change?: () => void;
        placeholder?: string;
        on_blur?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DropdownProps = typeof __propDef.props;
export type DropdownEvents = typeof __propDef.events;
export type DropdownSlots = typeof __propDef.slots;
export default class Dropdown extends SvelteComponent<DropdownProps, DropdownEvents, DropdownSlots> {
}
export {};
