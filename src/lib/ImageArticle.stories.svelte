<script context="module" type="ts">
	import ImageArticle from '$lib/ImageArticle.svelte';
	import accessibilityImageFile from '../stories/assets/accessibility.svg';
	import discordImageFile from '../stories/assets/discord.svg';
	import youtubeImageFile from '../stories/assets/youtube.svg';
	import tutorialsImageFile from '../stories/assets/tutorials.svg';

	export const meta = {
		title: 'ImageArticle',
		component: ImageArticle,
		argTypes: {
			reversed: {
				control: { type: 'boolean' }
			},
			figureCaption: {
				control: { type: 'text' }
			},
			imgSrc: {
				control: { type: 'select' },
				options: [
					accessibilityImageFile,
					discordImageFile,
					youtubeImageFile,
					tutorialsImageFile,
					tutorialsImageFile]
			},
			buttonList: {}
		},
		args: {
			alt: 'Accessibility alternative text',
			imgSrc: accessibilityImageFile,
			figureCaption: undefined,
			articleTitle: 'Accessibility',
			articleContent: 'Accessibility is incredibly important, yet often overlooked in traditional digital design and development education. Because of this, The A11Y Project strives to be a living example of how to create beautiful, accessible, and inclusive digital experiences.',
			buttonList: [
				{ href: '/foo', label: 'Foo' },
				{ href: '/bar', label: 'Bar' }
			],
			reversed: false
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<ImageArticle {...args}></ImageArticle>
</Template>

<Story name="Default" />
<Story name="Reversed" args={{ reversed: true }} />
<Story name="Figure caption" args={{ figureCaption: "An optional caption for the figure" ,
buttonList:[
	{
		href:"https://developer.mozilla.org/en-US/docs/Glossary/Accessible_description",
		label:"Learn about accessible description"
	}
	]
}} />
