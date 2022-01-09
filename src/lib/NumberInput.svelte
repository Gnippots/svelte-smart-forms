<script>
    import BaseInput from '$lib/BaseInput.svelte';
    export let label = '';
    export let value = '';
    export let required = false;
    export let name = '';
    export let disabled = false;
    export let form_validator = null;
    export let classes = 'standard-input'
    export let on_change = () => {};
    export let placeholder = '';
    export let mask = null;
    export let min = null;
    export let max = null;
    let field_validator;
                
</script>

<BaseInput
    label={label}
    required={required}
    name={name}
    bind:field_validator={field_validator}
    bind:value={value}
    form_validator={form_validator}
>
<div slot="input">
    <input
        on:blur={() => {field_validator.blur()}}
        on:keyup={on_change}
        required={required}
        disabled="{disabled}"
        placeholder="{placeholder}"
        type="number"
        name="{name}"
        bind:value="{value}"
        min="{min}"
        max="{max}"
    />
</div>
</BaseInput>