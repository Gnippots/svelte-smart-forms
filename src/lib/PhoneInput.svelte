<script>
    import BaseInput from '$lib/BaseInput.svelte';
    export let label = '';
    export let value = '';
    export let required = false;
    export let name = '';
    export let disabled = false;
    export let show_validation = true;
    export let form_validator = null;
    export let classes = 'smart-form-input';
    export let on_change = () => {};
    export let on_keyup = () => {};
    export let placeholder = '';
    let field_validator;
                
</script>

<BaseInput
    label={label}
    classes={classes}
    required={required}
    name={name}
    bind:value={value}
    bind:field_validator={field_validator}
    form_validator={form_validator}
    show_validation={show_validation}
    on_change={on_change}
    validation_functions={[]}
>
    <input
        slot="input"
        on:blur={() => {field_validator.blur()}}
        required={required}
        on:keyup={on_keyup}
        disabled="{disabled}"
        placeholder="{placeholder}"
        type="text"
        name="{name}"
        bind:value="{value}"
    />
</BaseInput>