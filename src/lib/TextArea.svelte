<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
    import type { FieldValidator, FormValidator } from './Interfaces';
    export let label = '';
    export let value = '';
    export let required = false;
    export let rows = 4;
    export let name = '';
    export let disabled = false;
    export let form_validator: FormValidator | null = null;
    export let classes = 'smart-form-input'
    export let on_change = () => {};
    export let placeholder = '';
    let field_validator: FieldValidator;
                
</script>

<BaseInput
    label={label}
    required={required}
    name={name}
    classes={classes}
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