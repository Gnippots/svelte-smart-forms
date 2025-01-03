<!-- ErrorMessage.svelte -->
<script lang="ts">
    import type { FormState, Field } from './Interfaces';
  
  interface Props {
    formState?: FormState | null;
    field?: keyof Field | null;
  }

  let { formState = null, field = null }: Props = $props();
  </script>
  
  {#if $formState && field}
    <p class="error-message">
    {#if 
        $formState.fields[field] &&
        Object.keys($formState.fields[field].errors).length !== 0 && 
        ($formState.fields[field].blurred || $formState.submitted)}
        
        {$formState.fields[field].errors[Object.keys($formState.fields[field].errors)[0]]}
    {/if}
  </p>
  
  {/if}
  
  <style></style>