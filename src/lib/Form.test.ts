import { fireEvent, render, screen } from '@testing-library/svelte';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import { describe, expect, it, vi } from 'vitest';
import { createFormState } from './FormState';
import FormHarness from './FormHarness.test.svelte';
import { inputValue } from './test-helpers';

describe('Form validation state', () => {
  it('registers required fields as invalid before user interaction', async () => {
    const formState = createFormState();

    render(FormHarness, { props: { formState } });
    await tick();

    const state = get(formState);
    expect(state.fields.requiredText.value).toBe('');
    expect(state.fields.requiredText.errors).toEqual({ required: 'This is required' });
    expect(state.valid).toBe(false);
  });

  it('shows field errors only after blur or submit', async () => {
    const formState = createFormState();
    const { container } = render(FormHarness, { props: { formState } });
    await tick();

    expect(screen.queryByText('This is required')).toBeNull();

    const input = container.querySelector('input[name="requiredText"]');
    expect(input).toBeInstanceOf(HTMLInputElement);

    await fireEvent.blur(input as HTMLInputElement);
    await tick();
    expect(screen.getByText('This is required')).toBeTruthy();
  });

  it('marks submitted and blocks invalid submits', async () => {
    const formState = createFormState();
    const onSubmit = vi.fn();
    const { container } = render(FormHarness, { props: { formState, onSubmit } });
    await tick();

    const form = container.querySelector('form');
    expect(form).toBeInstanceOf(HTMLFormElement);

    await fireEvent.submit(form as HTMLFormElement);
    await tick();

    expect(get(formState).submitted).toBe(true);
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('This is required')).toBeTruthy();
  });

  it('allows valid submits', async () => {
    const formState = createFormState();
    const onSubmit = vi.fn();
    const { container } = render(FormHarness, { props: { formState, onSubmit } });
    await tick();

    const input = container.querySelector('input[name="requiredText"]');
    const form = container.querySelector('form');
    expect(input).toBeInstanceOf(HTMLInputElement);
    expect(form).toBeInstanceOf(HTMLFormElement);

    await inputValue(input as HTMLInputElement, 'ready');
    await fireEvent.submit(form as HTMLFormElement);
    await tick();

    expect(get(formState).valid).toBe(true);
    expect(onSubmit).toHaveBeenCalledOnce();
  });
});
