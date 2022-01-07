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
    let blurred = false;
    let field_validator;
                
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

>
    <input
        slot="input"
        on:blur={() => {blurred = true;}}
        required={required}
        disabled="{disabled}"
        placeholder="{placeholder}"
        type="password"
        name="{name}"
        bind:value="{value}"
    />
</BaseInput>