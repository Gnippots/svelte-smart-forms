import type { FormState, FieldState } from './Interfaces';
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const BaseInput: $$__sveltets_2_IsomorphicComponent<{
    label?: string;
    value?: any;
    required?: boolean;
    disabled?: boolean;
    classes?: string;
    name?: string;
    show_validation?: boolean;
    placeholder?: string;
    formState?: FormState | null;
    on_change?: () => void;
    validation_functions?: Array<() => void>;
    fieldState?: FieldState;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    label: {};
    input: {};
    errors: {};
}, {}, string>;
type BaseInput = InstanceType<typeof BaseInput>;
export default BaseInput;
