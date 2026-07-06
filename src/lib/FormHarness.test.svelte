<script lang="ts">
  import FieldErrors from './FieldErrors.svelte';
  import Form from './Form.svelte';
  import type { FormState } from './Interfaces';
  import TextInput from './TextInput.svelte';

  interface Props {
    formState: FormState;
    onSubmit?: () => void;
    value?: string;
  }

  let { formState, onSubmit = () => {}, value = $bindable('') }: Props = $props();
</script>

<Form {formState} {onSubmit}>
  <TextInput name="requiredText" bind:value required {formState} showValidation={false} />
  <FieldErrors {formState} field="requiredText" />
  <button>Submit</button>
</Form>
