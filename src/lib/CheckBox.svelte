<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot making the component unusable -->
<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
    import { createFieldState } from './FieldState.svelte';
    import type { FieldState, FormState } from './Interfaces';

    interface Props {
        label?: string;
        value?: boolean;
        required?: boolean;
        name?: string;
        disabled?: boolean;
        show_validation?: boolean;
        formState: FormState;
        classes?: string;
        on_change?: () => void;
    }

    let {
        label = '',
        value = $bindable(false),
        required = false,
        name = '',
        disabled = false,
        show_validation = true,
        formState,
        classes = 'smart-form-input',
        on_change = () => {}
    }: Props = $props();

    let fieldState = $state<FieldState>(createFieldState());
</script>

{#snippet input()}
    <div class="custom-control custom-switch mb-2">
        <input
            type="checkbox"
            class="custom-control-input"
            onblur={() => fieldState.blur()}
            {name}
            id={name}
            {required}
            bind:checked={value}
            {disabled}
        />
    </div>
{/snippet}

<BaseInput
    {label}
    {classes}
    {required}
    {name}
    {value}
    {fieldState}
    {formState}
    {show_validation}
    {on_change}
    validation_functions={[]}
    input={input}
>
</BaseInput>