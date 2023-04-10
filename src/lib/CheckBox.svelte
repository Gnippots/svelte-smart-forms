<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
    import type { FieldValidator, FormValidator } from './Interfaces';
    export let label = '';
    export let value = false;
    export let required = false;
    export let name = '';
    export let disabled = false;
    export let form_validator: FormValidator | null = null;
    export let on_change = () => {};
    let field_validator: FieldValidator;
</script>

<BaseInput
    label={label}
    name={name}
    required={required}
    bind:value={value}
    form_validator={form_validator}
    bind:field_validator={field_validator}
    on_change={on_change}
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
            {value}
            <slot name="label"></slot>
        </label>
    </div>
</div>

</BaseInput>