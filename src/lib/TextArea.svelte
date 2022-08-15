<script>
    import BaseInput from '$lib/BaseInput.svelte';
    export let label = '';
    export let value = '';
    export let required = false;
    export let rows = 4;
    export let name = '';
    export let disabled = false;
    export let form_validator = null;
    export let classes = 'smart-form-input'
    export let on_change = () => {};
    export let placeholder = '';
    let field_validator;
                
</script>

<BaseInput
    label={label}
    required={required}
    name={name}
    bind:value={value}
    bind:field_validator={field_validator}
    form_validator={form_validator}
    on_change={on_change}

>
    <textarea
        slot="input"
        style="height: auto;"
        on:blur={() => {field_validator.blur()}}
        rows={rows}
        required={required}
        bind:value={value}
        disabled={disabled}
        placeholder={placeholder}
        name={name}
        
    ></textarea>
</BaseInput>