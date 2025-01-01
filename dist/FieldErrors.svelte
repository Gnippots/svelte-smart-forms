<!-- ErrorMessage.svelte -->
<script>export let formState = null;
export let field = null;
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