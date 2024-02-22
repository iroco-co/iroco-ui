# iroco-ui

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/iroco-co/iroco-ui/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/iroco-co/iroco-ui/tree/main)

Design system for Iroco [based on SvelteKit](https://kit.svelte.dev/docs/packaging).

See the [Documentation](https://iroco-co.github.io/iroco-ui/) (not in sync anymore : to be restored with storybook)

# Install in your svelte application

Prerequisites:

- @sveltejs/kit: ^2.5.0
- svelte: ^4.2.10

```sh
# latest
npm install @iroco/ui
# next
npm install @iroco/ui@next
```

## Minimal scaffolding

`src/app.scss`

```scss
@use 'node_modules/@iroco/ui/dist/scss/fonts';
@use 'node_modules/@iroco/ui/dist/scss/style';
@use 'node_modules/@iroco/ui/dist/scss/constants';
@import 'node_modules/@iroco/ui/dist/scss/containers';
```

Example of layout with navigation

`src/routes/+layout.svelte`

```svelte
<script>
	import '../app.scss';
	import { Navigation, NavigationItem } from '@iroco/ui';
</script>

<Navigation navigationItems={[new NavigationItem('About', '/about')]} type="topbar" />
<main class="main">
	<slot />
</main>

<style lang="scss">
	@use 'node_modules/@iroco/ui/dist/scss/colors.scss';
	@use 'node_modules/@iroco/ui/dist/scss/constants.scss';
	@import 'node_modules/@iroco/ui/dist/scss/containers.scss';
	@import 'node_modules/@iroco/ui/dist/scss/button.scss';
</style>
```

# develop

To install dependencies :

```shell
~/src/iroco-ui$ npm ci
```

Building :

```shell
~/src/iroco-ui$ npm run build
```

Releasing :

```shell
~/iroco-ui$ npm publish
```

# documentation (to be done with storybook)

The docs directory contains the documentation app deployed on github pages. To install dependencies :

```shell
~/src/iroco-ui/docs$ npm ci
```

You can add/update components documentation into `docs/src/pages/components` and update the left menu in `docs/src/includes/sidebar.md`.

When you have to work on the CSS for components, you can have hot reloading. To do so you have to make the iroco-ui build watched with :

```shell
~/src/iroco-ui$ npx npm-watch build
```

And in the same time launch the dev server for docs :

```shell
~/src/iroco-ui/docs$ npm run dev
```

To build the documentation (in docs) :

```shell
~/src/iroco-ui/docs$ npm run build
```
