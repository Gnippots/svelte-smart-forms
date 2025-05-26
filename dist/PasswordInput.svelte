<script lang="ts">
  import BaseInput from './BaseInput.svelte';
	import type { Snippet } from 'svelte';
  import type { FieldState, FormState } from './Interfaces';
	import { createFieldState } from './FieldState.svelte';

  interface Props {
    label?: string;
    value?: string;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState: FormState;
    classes?: string;
    onChange?: any;
    placeholder?: string;
    confirm_against?: string;
    showPasswordToggle?: Snippet;
    hidePasswordToggle?: Snippet;
    showValidation?: boolean;
  }

  let {
    label = '',
    value = $bindable(''),
    required = false,
    name = '',
    disabled = false,
    formState,
    classes = 'smart-form-input',
    onChange = () => {},
    placeholder = '',
    confirm_against = '',
    showPasswordToggle = undefined,
    hidePasswordToggle = undefined,
    showValidation = true
  }: Props = $props();
  
  let fieldState = $state<FieldState>(createFieldState());
  let show_password: boolean = $state(false);


  function toggle_show() {
    show_password = !show_password;
  }

  let validate_confirmation = () => {
    if (confirm_against !== '' && value != '' && confirm_against !== value) {
      fieldState?.addError('confirm', 'Passwords do not match');
    }
  };
</script>

<BaseInput
  {label}
  {name}
  {classes}
  {required}
  bind:value={value}
  bind:fieldState={fieldState}
  {formState}
  {onChange}
  validationFunctions={[validate_confirmation]}
  {showValidation}
>
  {#snippet input()}
    <div class="input-group">
      {#if show_password}
        <input
          onblur={() => {
            fieldState?.blur();
          }}
          {required}
          {disabled}
          {placeholder}
          type="text"
          {name}
          bind:value
        />
      {:else}
        <input
          onblur={() => {
            fieldState?.blur();
          }}
          {required}
          {disabled}
          {placeholder}
          type="password"
          {name}
          bind:value
        />
      {/if}
      <button type="button" class="password-toggle" onclick={toggle_show}>
        {#if !show_password}
          {#if showPasswordToggle}
            {@render showPasswordToggle()}
          {:else}
            Show
          {/if}
        {:else}
          {#if hidePasswordToggle}
            {@render hidePasswordToggle()}
          {:else}
            Hide
          {/if}
        {/if}
      </button>
    </div>
  {/snippet}
</BaseInput>
