<script lang="ts">
  import { get } from 'svelte/store';
  import type { FormState } from './Interfaces';

  interface Props {
    formState?: FormState | null;
    onSubmit?: (() => void) | null;
    children?: import('svelte').Snippet;
    id?: string | null;
  }

  let { formState = null, onSubmit = null, children, id = null }: Props = $props();

  const submitHandler = (event: Event) => {
    event.preventDefault();

    if (!formState) {
      return;
    }

    formState.setSubmitted(true);
    if (!onSubmit) {
      return;
    }
    if (!get(formState).valid) {
      return;
    }

    onSubmit();
  };
</script>

<form onsubmit={submitHandler} novalidate id={id}>
  {@render children?.()}
</form>