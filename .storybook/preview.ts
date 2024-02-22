import type { Preview } from '@storybook/svelte';

// Here we can import CSS from our design system
import './iroco.scss';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		cssprops: {
			// Disable the addon by setting disable to true:                                                                                        
			disable: false,
			// Override the detected default control type:                                                                                        
			'color-body': {
				control: 'color',
				category: 'Background',
				description: '',
				presetColors: [
					'#211d28',
				],
			},
			'color-primary-light': {
				control: 'color',
				category: 'Main colors',
				subcategory: 'Primary',
				description: ''
			},
			'color-primary': {
				control: 'color',
				category: 'Main colors',
				subcategory: 'Primary',
				description: ''
			},
			'color-primary-bg': {
				control: 'color',
				category: 'Main colors',
				subcategory: 'Primary',
				description: ''
			},
			'color-primary-dark': {
				control: 'color',
				category: 'Main colors',
				subcategory: 'Primary',
				description: ''
			},
			'color-secondary-light': {
				control: 'color',
				category: 'Main colors',
				subcategory: 'Secondary',
				description: ''
			},
			'color-secondary': {
				control: 'color',
				category: 'Main colors',
				subcategory: 'Secondary',
				description: ''
			},
			'color-secondary-dark': {
				control: 'color',
				category: 'Main colors',
				subcategory: 'Secondary',
				description: ''
			},
			'color-white-op-20': {
				control: 'color',
				category: 'Main colors',
				subcategory: 'Shades',
				description: ''
			},
			'color-white-op-30': {
				control: 'color',
				category: 'Main colors',
				subcategory: 'Shades',
				description: ''
			},
			'color-black-op-20': {
				control: 'color',
				category: 'Main colors',
				subcategory: 'Shades',
				description: ''
			},
			'color-black-op-40': {
				control: 'color',
				category: 'Main colors',
				subcategory: 'Shades',
				description: ''
			},
			'color-black-op-60': {
				control: 'color',
				category: 'Main colors',
				subcategory: 'Shades',
				description: ''
			},
			'color-dark-blue-op-30': {
				control: 'color',
				category: 'Main colors',
				subcategory: 'Shades',
				description: ''
			},
			'color-success': {
				control: 'color',
				category: 'Feedback',
				subcategory: 'Success',
				description: ''
			},
			'color-success-bg': {
				control: 'color',
				category: 'Feedback',
				subcategory: 'Success',
				description: ''
			},
			'color-danger': {
				control: 'color',
				category: 'Feedback',
				subcategory: 'Danger',
				description: ''
			},
			'color-danger-bg': {
				control: 'color',
				category: 'Feedback',
				subcategory: 'Danger',
				description: ''
			},
			'color-warning': {
				control: 'color',
				category: 'Feedback',
				subcategory: 'Warning',
				description: ''
			},
			'color-warning-bg': {
				control: 'color',
				category: 'Feedback',
				subcategory: 'Warning',
				description: ''
			},
			'color-border': {
				control: 'color',
				category: 'Borders',
				// subcategory: 'Borders',
				description: ''
			},

			'color-text-light': {
				control: 'color',
				category: 'Typography',
				subcategory: 'Shades',
				description: ''
			},
			'color-text': {
				control: 'color',
				category: 'Typography',
				// subcategory: 'Shades',
				description: ''
			},
			'color-text-op-50': {
				control: 'color',
				category: 'Typography',
				subcategory: 'Shades',
				description: ''
			},
			'color-text-op-60': {
				control: 'color',
				category: 'Typography',
				subcategory: 'Shades',
				description: ''
			},
			'color-text-dark': {
				control: 'color',
				category: 'Typography',
				subcategory: 'Shades',
				description: ''
			},
			'form-element-border': {
				control: 'color',
				category: 'Forms',
				// subcategory: 'Bar', 
				description: ''
			},
			'form-element-bg': {
				control: 'color',
				category: 'Forms',
				// subcategory: 'Bar', 
				description: ''
			},
			'form-text-placeholder': {
				control: 'color',
				category: 'Forms',
				// subcategory: 'Bar', 
				description: ''
			},
			'btn-primary-bg': {
				control: 'color',
				category: 'Buttons',
				subcategory: 'Primary',
				description: ''
			},
			'btn-primary-border': {
				control: 'color',
				category: 'Buttons',
				subcategory: 'Primary',
				description: ''
			},
			'btn-primary-label': {
				control: 'color',
				category: 'Buttons',
				subcategory: 'Primary',
				description: ''
			},
			'dark-btn-primary-label': {
				control: 'color',
				category: 'Buttons',
				subcategory: 'Primary',
				description: ''
			},
			'dark-btn-primary-bg': {
				control: 'color',
				category: 'Buttons',
				subcategory: 'Primary',
				description: ''
			},
			'btn-basic-label': {
				control: 'color',
				category: 'Buttons',
				subcategory: 'Basic',
				description: ''
			},
			'btn-basic-bg': {
				control: 'color',
				category: 'Buttons',
				subcategory: 'Basic',
				description: ''
			},
			'btn-basic-border': {
				control: 'color',
				category: 'Buttons',
				subcategory: 'Basic',
				description: ''
			},
			'btn-disabled-label': {
				control: 'color',
				category: 'Buttons',
				subcategory: 'Disabled',
				description: ''
			},
			'btn-disabled-bg': {
				control: 'color',
				category: 'Buttons',
				subcategory: 'Disabled',
				description: ''
			},
			'btn-disabled-border': {
				control: 'color',
				category: 'Buttons',
				subcategory: 'Disabled',
				description: ''
			},
			'color-icon-primary': {
				control: 'color',
				category: 'Icons',
				// subcategory: 'Bar', 
				description: ''
			},
			'color-icon-secondary': {
				control: 'color',
				category: 'Icons',
				// subcategory: 'Bar', 
				description: ''
			},

			// Customise preset colours for the colourpicker
			presetColors: [
				'#82eec7',
				'#00d692',
				'#00a873',
				'#ff504d',
				'#ffe032',
				'#00b9ff',
				'#ffffff',
				'#f5f5f5',
				'#f2ebe3',
				'#a9a29e',
				'#464452',
				'#33323a',
				'#211d28',
				'#18151e'
			]
		}
	}
};

export default preview;
