<!-- ErrorMessage.svelte -->
<script lang="ts">
    import type { FormValidator, Field } from './Interfaces';
  
    export let form_validator: FormValidator | null = null;
    export let field: keyof Field | null = null;
  </script>
  
  {#if $form_validator && field}
    <p class="error-message">
    {#if 
        $form_validator.fields[field] &&
        Object.keys($form_validator.fields[field].errors).length !== 0 && 
        ($form_validator.fields[field].blurred || $form_validator.submitted) 
    }
        
        {$form_validator.fields[field].errors[Object.keys($form_validator.fields[field].errors)[0]]}
    {/if}
  </p>
  
  {/if}
  
  <style></style>