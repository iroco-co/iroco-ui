import { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx|svelte)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-svelte-csf',
		'@ljcl/storybook-addon-cssprops'
	],
	framework: {
		name: '@storybook/svelte-vite',
		options: {}
	},
	docs: {},
	core: {
		disableTelemetry: true
	}
};
export default config;
