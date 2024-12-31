<script lang="ts">
    import type { FormState } from './Interfaces';
    import { toast_error } from '../lib/toast_themes';
  
    export let formState: FormState | null = null;
    export let onSubmit: (() => void) | null = null;
  
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
      console.log('z')
      if (!$formState.valid) {
      console.log('x')
        console.log(typeof(toast_error))
        toast_error('Some fields were missing or incorrect');
        return;
      }
  
      onSubmit();
    };
  
    $: {
      if (formState) {
        validate();
        $formState?.fields;
      }
    }
  </script>
  
  <form on:submit|preventDefault={submitHandler} novalidate>
    <slot></slot>
  </form>
  
  <style></style>
  