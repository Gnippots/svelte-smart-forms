/** @typedef {typeof __propDef.props}  AddressFieldProps */
/** @typedef {typeof __propDef.events}  AddressFieldEvents */
/** @typedef {typeof __propDef.slots}  AddressFieldSlots */
export default class AddressField {
}
export type AddressFieldProps = typeof __propDef.props;
export type AddressFieldEvents = typeof __propDef.events;
export type AddressFieldSlots = typeof __propDef.slots;
declare const __propDef: {
    props: {
        required?: {} | undefined;
        label?: string | undefined;
        address?: {
            formatted: string;
        } | undefined;
        formState?: null | undefined;
        on_change?: (() => void) | undefined;
        classes?: string | undefined;
        name?: string | undefined;
        show_search?: boolean | undefined;
        mailing?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: undefined;
    bindings?: undefined;
};
export {};
