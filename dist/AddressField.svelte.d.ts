interface Props {
    address?: any;
    label?: string;
    formState?: any;
    required?: any;
    on_change?: any;
    classes?: string;
    name?: string;
    show_search?: boolean;
    mailing?: boolean;
    placeholder?: string;
}
declare const AddressField: import("svelte").Component<Props, {}, "address">;
type AddressField = ReturnType<typeof AddressField>;
export default AddressField;
