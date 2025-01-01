<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
    import type { FieldState, FormState } from './Interfaces';
    interface Props {
        label?: string;
        value?: string;
        required?: boolean;
        name?: string;
        disabled?: boolean;
        formState?: FormState | null;
        classes?: string;
        on_change?: any;
        placeholder?: string;
        confirm_against?: string;
    }

    let {
        label = '',
        value = $bindable(''),
        required = false,
        name = '',
        disabled = false,
        formState = null,
        classes = 'smart-form-input',
        on_change = () => {},
        placeholder = '',
        confirm_against = ''
    }: Props = $props();
    let fieldState: FieldState = $state();
    let show_password: boolean = $state();

    function toggle_show() {
        show_password = !show_password;
    }

    let validate_confirmation = () => {
        if (confirm_against !== '' && value != '' && confirm_against !== value) { 
            fieldState.add_error('confirm', 'Passwords do not match');            
        }
    }
                
</script>

<BaseInput
    label={label}
    name={name}
    classes={classes}
    required={required}
    bind:value={value}
    bind:fieldState={fieldState}
    formState={formState}
    on_change={on_change}
    validation_functions={[validate_confirmation]}

>

    {#snippet input()}
        <div class="input-group" >
            {#if show_password}
            <input
                onblur={() => {fieldState.blur()}}
                required={required}
                disabled="{disabled}"
                placeholder="{placeholder}"
                type="text"
                name="{name}"
                bind:value="{value}"
            />
            {:else}
            <input
                onblur={() => {fieldState.blur()}}
                required={required}
                disabled="{disabled}"
                placeholder="{placeholder}"
                type="password"
                name="{name}"
                bind:value="{value}"
            />
            {/if}
            <div class="password-toggle" onclick={toggle_show}>
                Show
            </div>
        </div>
    {/snippet}
</BaseInput>