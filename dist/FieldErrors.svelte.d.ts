import type { FormState, Field } from './Interfaces';
interface Props {
    formState?: FormState | null;
    field?: keyof Field | null;
}
declare const FieldErrors: import("svelte").Component<Props, {}, "">;
type FieldErrors = ReturnType<typeof FieldErrors>;
export default FieldErrors;
