import { sveltekit } from '@sveltejs/kit/vite';
import { configDefaults } from 'vitest/config';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		// jest like globals
		globals: true,
		environment: 'jsdom',
		// in-source testing
		includeSource: ['src/**/*.{js,ts,svelte}'],
		// Add @testing-library/jest-dom matchers & mocks of SvelteKit modules
		setupFiles: ['test/setupTest.ts'],
		// Exclude files in c8
		coverage: {
			exclude: ['test/setupTest.ts']
		},
		// Exclude playwright tests folder
		exclude: [...configDefaults.exclude, 'tests']
	}
};

export default config;
