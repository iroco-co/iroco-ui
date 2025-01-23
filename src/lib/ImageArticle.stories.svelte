<script module lang="ts">
	import { ImageArticle } from '$lib/index';
	import accessibilityImageFile from '../stories/assets/accessibility.svg';
	import discordImageFile from '../stories/assets/discord.svg';
	import youtubeImageFile from '../stories/assets/youtube.svg';
	import tutorialsImageFile from '../stories/assets/tutorials.svg';

	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Iroco-UI/Components/ImageArticle',
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
					tutorialsImageFile
				]
			},
			buttonList: {}
		},
		args: {
			alt: 'Accessibility alternative text',
			imgSrc: accessibilityImageFile,
			figureCaption: undefined,
			articleTitle: 'Accessibility',
			articleContent:
				'Accessibility is incredibly important, yet often overlooked in traditional digital design and development education. Because of this, The A11Y Project strives to be a living example of how to create beautiful, accessible, and inclusive digital experiences.',
			buttonList: [
				{ href: '/foo', label: 'Foo' },
				{ href: '/bar', label: 'Bar' }
			],
			reversed: false
		}
	});
</script>

<script lang="ts">
	setTemplate(template);
</script>

{#snippet template({ ...args })}
	<ImageArticle {...args}></ImageArticle>
{/snippet}

<Story name="Default" />
<Story name="Reversed" args={{ reversed: true }} />
<Story
	name="Figure caption"
	args={{
		figureCaption: 'An optional caption for the figure',
		buttonList: [
			{
				href: 'https://developer.mozilla.org/en-US/docs/Glossary/Accessible_description',
				label: 'Learn about accessible description'
			}
		]
	}}
/>
