import type { Preview } from '@storybook/svelte';

// Here we can import CSS from our design system
import '../src/lib/scss/style.scss';
import './iroco.scss';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	}
};

export default preview;
