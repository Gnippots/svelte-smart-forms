import { fireEvent, render } from '@testing-library/svelte';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import { expect } from 'vitest';
import { createFormState } from './FormState';
import type { FormState } from './Interfaces';

export async function renderField(
  component: Parameters<typeof render>[0],
  props: Record<string, unknown>,
  formState: FormState = createFormState()
) {
  const result = render(component, {
    props: {
      ...props,
      formState
    }
  });
  await tick();

  return {
    ...result,
    formState
  };
}

export function fieldValue(formState: FormState, name: string) {
  return get(formState).fields[name]?.value;
}

export function fieldErrors(formState: FormState, name: string) {
  return get(formState).fields[name]?.errors ?? {};
}

export function expectField(formState: FormState, name: string, value: unknown) {
  expect(fieldValue(formState, name)).toBe(value);
}

export async function inputValue(input: HTMLInputElement | HTMLTextAreaElement, value: string) {
  await fireEvent.input(input, { target: { value } });
  await tick();
}

export async function changeValue(input: HTMLInputElement | HTMLSelectElement, value: string) {
  await fireEvent.change(input, { target: { value } });
  await tick();
}

export async function blur(element: HTMLElement) {
  await fireEvent.blur(element);
  await tick();
}
