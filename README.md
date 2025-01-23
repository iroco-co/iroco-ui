# iroco-ui

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/iroco-co/iroco-ui/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/iroco-co/iroco-ui/tree/main)

Design system for Iroco [based on SvelteKit](https://kit.svelte.dev/docs/packaging).

See the [Documentation](https://iroco-co.github.io/iroco-ui/).

# Install in your svelte application

Prerequisites:

- @sveltejs/kit: ^2.x
- svelte: ^5.x

```sh
# latest
npm install @iroco/ui
# next
npm install @iroco/ui@next
```

## Usage

Example of layout with navigation

`src/routes/+layout.svelte`

```svelte
<script>
	import '../app.scss';
	import { Navigation, NavigationItem } from '@iroco/ui';
	import { base } from '$app/paths';
	import { page } from '$app/state';

	let currentRoute = $derived(page?.route?.id ?? '');

	/** snip **/
</script>

<Navigation
	{navigationItems}
	{currentRoute}
	baseUrl={base}
	type={'sidebar'}
	title={$_('account.title')}
	version={data?.version}
/>

<main class="main">
	<slot />
</main>

<style lang="scss">
	@use '@iroco/ui/scss/constants.scss';
	@use '@iroco/ui/scss/containers.scss';
	@use '@iroco/ui/scss/button.scss';
</style>
```

## Customize colors

You can override CSS vars that mainly located in `@iroco/ui/scss/colors.scss'` in a custom scss file such as `src/app.scss`.

Ex. in a custom `src/my-colors.css` file

```scss
:root {
	--color-primary-light: pink;
	--color-primary: red;
}
```

Then in your `src/app.scss` style you can both `@iroco-ui` default scss style and the override.

```scss
@use '@iroco/ui/scss/colors.scss';
@use 'my-colors.scss';
```

## Develop

To install dependencies :

```shell
npm ci
```

Building :

```shell
npm run build
```

Releasing (tags and releases to npm):

```shell
npm publish
```

## Documentation (Storybook)

The docs directory contains the documentation app deployed on github pages. To install dependencies :

```shell
npm ci
```

You can add/update components documentation into `docs/src/pages/components` and update the left menu in `docs/src/includes/sidebar.md`.

When you have to work on the CSS for components, you can have hot reloading.
Launch the dev server for docs :

```shell
npm run dev
```

To build the documentation (in `/docs`) :

```shell
npm run build-storybook
```

## CSS Custom properties in Storybook

CSS Custom properties allows to try out variations of the design system.
It relies on parts of the design system style that have been ported to CSS vars in this very purpose.

Those variable relate mainly to colors.

Add missing variables to Storybook

[.storybook/preview.ts](.storybook/preview.ts)

It should reflect variables declared here :

[src/lib/scss/colors.scss](src/lib/scss/colors.scss)
