import type { FormState } from './Interfaces';
interface Props {
    formState?: FormState | null;
    onSubmit?: (() => void) | null;
    children?: import('svelte').Snippet;
}
declare const Form: import("svelte").Component<Props, {}, "">;
type Form = ReturnType<typeof Form>;
export default Form;
