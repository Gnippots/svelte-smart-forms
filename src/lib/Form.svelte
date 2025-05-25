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
  
    const validate = () => {
      if (!$formState) return;
  
      $formState.valid = true;
  
      for (const [, field] of Object.entries($formState.fields)) {
        if (!field.valid) {
          $formState.valid = false;
        }
      }
  
      $formState.customRules.forEach((rule) => {
        rule();
      });
    };
  
    const submitHandler = (event: Event) => {
      event.preventDefault();
  
      if (!$formState) return;
  
      $formState.submitted = true;
      if (!onSubmit) {
        return;
      }
      if (!$formState.valid) {
        //toast_error('Some fields were missing or incorrect');
        return;
      }
  
      onSubmit();
    };
  
    // Initialize form state and validate fields
    $effect.root(() => {
      if (formState) {
        validate();
      }
    });
  </script>
  
  <form onsubmit={submitHandler} novalidate id={id}>
    {@render children?.()}
  </form>
  
  <style></style>
  