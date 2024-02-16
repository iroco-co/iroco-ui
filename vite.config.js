import { sveltekit } from '@sveltejs/kit/vite';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
	plugins: [sveltekit()],
	resolve: {
		conditions: mode === 'test' ? ['browser'] : []
	},
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
}));


