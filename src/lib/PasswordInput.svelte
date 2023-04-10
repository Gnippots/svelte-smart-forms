<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
    import type { FieldValidator, FormValidator } from './Interfaces';
    export let label = '';
    export let value = '';
    export let required = false;
    export let name = '';
    export let disabled = false;
    export let form_validator: FormValidator | null = null;
    export let classes = 'smart-form-input'
    export let on_change = () => {};
    export let placeholder = '';
    export let confirm_against = '';
    let field_validator: FieldValidator;
    let show_password: boolean;

    function toggle_show() {
        show_password = !show_password;
    }

    let validate_confirmation = () => {
        if (confirm_against !== '' && value != '' && confirm_against !== value) { 
            field_validator.add_error('confirm', 'Passwords do not match');            
        }
    }
                
</script>

<BaseInput
    label={label}
    name={name}
    classes={classes}
    required={required}
    bind:value={value}
    bind:field_validator={field_validator}
    form_validator={form_validator}
    on_change={on_change}
    validation_functions={[validate_confirmation]}

>

    <div class="input-group" slot="input">
        {#if show_password}
        <input
            on:blur={() => {field_validator.blur()}}
            required={required}
            disabled="{disabled}"
            placeholder="{placeholder}"
            type="text"
            name="{name}"
            bind:value="{value}"
        />
        {:else}
        <input
            on:blur={() => {field_validator.blur()}}
            required={required}
            disabled="{disabled}"
            placeholder="{placeholder}"
            type="password"
            name="{name}"
            bind:value="{value}"
        />
        {/if}
        <div class="password-toggle" on:click={toggle_show}>
            Show
        </div>
    </div>
</BaseInput>