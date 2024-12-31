<!-- ErrorMessage.svelte -->
<script lang="ts">
    import type { FormState, Field } from './Interfaces';
  
    export let formState: FormState | null = null;
    export let field: keyof Field | null = null;
  </script>
  
  {#if $formState && field}
    <p class="error-message">
    {#if 
        $formState.fields[field] &&
        Object.keys($formState.fields[field].errors).length !== 0 && 
        ($formState.fields[field].blurred || $formState.submitted) 
    }
        
        {$formState.fields[field].errors[Object.keys($formState.fields[field].errors)[0]]}
    {/if}
  </p>
  
  {/if}
  
  <style></style>