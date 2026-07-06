import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [svelteTesting(), sveltekit()],
	build: {
		sourcemap: true
	},
	test: {
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{ts,js}']
	}
});
