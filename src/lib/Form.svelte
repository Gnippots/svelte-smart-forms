<script lang="ts">
  import { run, preventDefault } from 'svelte/legacy';
  import type { FormState } from './Interfaces';
  import { get } from 'svelte/store';
    
  
  interface Props {
    //import { toast_error } from '../lib/toast_themes';
    formState?: FormState | null;
    onSubmit?: (() => void) | null;
    children?: import('svelte').Snippet;
    id? : string | null
  }

  let { formState = null, onSubmit = null, children, id = null }: Props = $props();

  console.log(formState?.subscribe);
  
  
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
  
    run(() => {
      if (formState) {
        validate();
        $formState?.fields;
      }
    });
  </script>
  
  <form onsubmit={preventDefault(submitHandler)} novalidate id={id}>
    {@render children?.()}
  </form>
  
  <style></style>
  