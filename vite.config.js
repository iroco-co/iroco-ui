import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import { configDefaults, defineConfig } from 'vitest/config';
import { join } from 'path';
import * as path from 'path';
import { fileURLToPath } from 'url';

let filename = fileURLToPath(import.meta.url);
const PACKAGE_ROOT = path.dirname(filename);

export default defineConfig({
	mode: process.env.MODE,
	root: PACKAGE_ROOT,
	resolve: {
		alias: {
			'$lib/': join(PACKAGE_ROOT, 'src/lib') + '/'
		}
	},
	plugins: [svelte({ hot: !process.env.VITEST }), svelteTesting()],
	test: {
		resolve: {
			alias: {
				'$lib/': 'src/lib/'
			}
		},
		// jest like globals
		globals: true,
		environment: 'happy-dom',
		// in-source testing
		includeSource: ['src/**/*.{js,ts,svelte}'],
		// Exclude files in c8
		coverage: {
			exclude: ['test/setupTest.ts']
		},
		// Exclude playwright tests folder
		exclude: [...configDefaults.exclude, 'tests'],
		alias: [{ find: '@testing-library/svelte', replacement: '@testing-library/svelte/svelte5' }]
	},
	base: '',
	server: {
		fs: {
			strict: true,
		},
	},
	build: {
		sourcemap: true,
		outDir: 'dist',
		assetsDir: '.',
		lib: {
			entry: 'src/lib/index.ts',
			formats: ['es'],
		},

		emptyOutDir: true,
		reportCompressedSize: false,
	},
});
