import type { FormState } from './Interfaces';
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
declare const CheckBox: $$__sveltets_2_IsomorphicComponent<{
    label?: string;
    value?: boolean;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState?: FormState | null;
    onChange?: () => void;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    label: {};
}, {}, string>;
type CheckBox = InstanceType<typeof CheckBox>;
export default CheckBox;
