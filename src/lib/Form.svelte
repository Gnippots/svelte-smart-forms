<script lang="ts">
    import type { FormValidator } from './Interfaces';
    import { toast_error } from '$lib/toast_themes';
  
    export let validator: FormValidator | null = null;
    export let onSubmit: (() => void) | null = null;
  
    const validate = () => {
      if (!$validator) return;
  
      $validator.valid = true;
  
      for (const [, field] of Object.entries($validator.fields)) {
        if (!field.valid) {
          $validator.valid = false;
        }
      }
  
      $validator.customRules.forEach((rule) => {
        rule();
      });
    };
  
    const submitHandler = (event: Event) => {
      event.preventDefault();
  
      if (!$validator) return;
  
      $validator.submitted = true;
      if (!onSubmit) {
        return;
      }
      if (!$validator.valid) {
        toast_error('Some fields were missing or incorrect');
        return;
      }
  
      onSubmit();
    };
  
    $: {
      if (validator) {
        validate();
        $validator?.fields;
      }
    }
  </script>
  
  <form on:submit|preventDefault={submitHandler} novalidate>
    <slot></slot>
  </form>
  
  <style></style>
  