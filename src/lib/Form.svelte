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
  
      // Run custom validation rules
      $formState.customRules.forEach((rule) => {
        console.log('custom rule', rule);
        const errorMessage = rule.fn();
        if (errorMessage) {
          console.log('errorMessage', errorMessage);
          const field = $formState.fields[rule.fieldName];
          console.log('field', field);
          if (field) {
            console.log('field', field);
            field.addError(rule.errorCode, errorMessage);
            $formState.valid = false;
          }
        } else {
          const field = $formState.fields[rule.fieldName];
          if (field) {
            field.removeError(rule.errorCode);
          }
        }
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
  