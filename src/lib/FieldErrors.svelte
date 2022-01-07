<script>
    export let form_validator = null;
    export let field = null;
</script>

{#if form_validator}
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