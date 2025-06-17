<script lang="ts">
  import type { FormState } from './Interfaces';
    
  
  interface Props {
    //import { toast_error } from '../lib/toast_themes';
    formState?: FormState | null;
    onSubmit?: (() => void) | null;
    children?: import('svelte').Snippet;
    id? : string | null
  }

  let { formState = null, onSubmit = null, children, id = null }: Props = $props();
  
  const submitHandler = (event: Event) => {
    event.preventDefault();

    if (!$formState) return;

    $formState.submitted = true;
    if (!onSubmit) {
      return;
    }
    if (!$formState.valid) {
      const firstErrorFieldKey = Object.keys($formState.errors)[0];
      if (firstErrorFieldKey && $formState.fields[firstErrorFieldKey]) {
        const fieldElement = $formState.fields[firstErrorFieldKey].element;
        if (fieldElement) {
          fieldElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
      //toast_error('Some fields were missing or incorrect');
      return;
    }

    onSubmit();
  };
</script>
  
  <form onsubmit={submitHandler} novalidate id={id}>
    {@render children?.()}
  </form>
  
  <style></style>
  