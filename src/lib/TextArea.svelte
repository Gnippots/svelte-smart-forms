<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
    import type { FieldState, FormState } from './Interfaces';
    export let label = '';
    export let value = '';
    export let required = false;
    export let rows = 4;
    export let name = '';
    export let disabled = false;
    export let formState: FormState | null = null;
    export let classes = 'smart-form-input'
    export let on_change = () => {};
    export let placeholder = '';
    let fieldState: FieldState;
                
</script>

<BaseInput
    label={label}
    required={required}
    name={name}
    classes={classes}
    bind:value={value}
    bind:fieldState={fieldState}
    formState={formState}
    on_change={on_change}

>
    <textarea
        slot="input"
        style="height: auto;"
        on:blur={() => {fieldState.blur()}}
        rows={rows}
        required={required}
        bind:value={value}
        disabled={disabled}
        placeholder={placeholder}
        name={name}
        
    ></textarea>
</BaseInput>