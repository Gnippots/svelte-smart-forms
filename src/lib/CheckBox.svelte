<script>
    import BaseInput from '$lib/BaseInput.svelte';
    export let label = '';
    export let value = '';
    export let required = false;
    export let name = '';
    export let disabled = false;
    export let form_validator = null;
    export let on_change = () => {};
    let blurred = false;
    let field_validator;
    let checked = false;

    let validate_email = () => {
        if (required && value === false) {
            field_validator.add_error('required', 'This field is required');
        }
    }

</script>

<BaseInput
    label={label}
    name={name}
    required={required}
    bind:value={value}
    bind:field_validator={field_validator}
    form_validator={form_validator}
    on_change={on_change}
    blurred={blurred}
    validation_functions={[validate_email]}
>
<div slot="input">
    <div class="custom-control custom-switch mb-2">
        <input
            type=checkbox
            class="custom-control-input"
            on:blur={() => {field_validator.blur()}}
            name={name}
            id={name}
            required={required}
            bind:checked={value}
            disabled={disabled}
        />
        
        <label for={name} class="custom-control-label">
            <slot name="label"></slot>
        </label>
    </div>
</div>

</BaseInput>