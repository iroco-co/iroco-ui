import globals from 'globals';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import * as svelteParser from 'svelte-eslint-parser';
import * as typescriptParser from '@typescript-eslint/parser';
import * as espree from 'espree';
import svelteConfig from './svelte.config.js';

export default [
	{
		ignores: ['package/*', '.svelte-kit/*', 'docs/*']
	},
	...eslintPluginSvelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: globals.browser,
			parser: svelteParser,
			parserOptions: {
				parser: {
					...svelteConfig,
					ts: typescriptParser,
					js: espree,
					typescript: typescriptParser
				},
				extraFileExtensions: ['.svelte']
			}
		}
	}
];
