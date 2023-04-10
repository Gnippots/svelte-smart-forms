<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
    import type { FieldValidator, FormValidator } from './Interfaces';


    export let label = '';
    export let value: Date | null = null;
    export let required = false;
    export let name = '';
    export let disabled = false;
    export let form_validator: FormValidator | null = null;
    export let classes = 'smart-form-input';
    export let on_change = () => {};
    export let placeholder = '';
    let field_validator: FieldValidator;
                
</script>

<BaseInput
    label={label}
    classes={classes}
    placeholder={placeholder}
    required={required}
    name={name}
    disabled={disabled}
    bind:value={value}
    bind:field_validator={field_validator}
    form_validator={form_validator}
    on_change={on_change}

>
<div slot="input">
    DatePicker Coming Soon
    <!--<Datepicker/>-->
</div>
</BaseInput>