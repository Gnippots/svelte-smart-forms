<script>export let formState = null;
export let onSubmit = null;
const validate = () => {
  if (!$formState)
    return;
  $formState.valid = true;
  for (const [, field] of Object.entries($formState.fields)) {
    if (!field.valid) {
      $formState.valid = false;
    }
  }
  $formState.customRules.forEach((rule) => {
    rule();
  });
};
const submitHandler = (event) => {
  event.preventDefault();
  if (!$formState)
    return;
  $formState.submitted = true;
  if (!onSubmit) {
    return;
  }
  if (!$formState.valid) {
    return;
  }
  onSubmit();
};
$: {
  if (formState) {
    validate();
    $formState?.fields;
  }
}
</script>
  
  <form on:submit|preventDefault={submitHandler} novalidate>
    <slot></slot>
  </form>
  
  <style></style>
  