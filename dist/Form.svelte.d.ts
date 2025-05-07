import type { FormState as FormStoreType } from './Interfaces';
interface Props {
    formState: FormStoreType | null;
    onSubmit?: (() => void) | null;
    children?: import('svelte').Snippet;
    id?: string | null;
}
declare const Form: import("svelte").Component<Props, {}, "">;
type Form = ReturnType<typeof Form>;
export default Form;
