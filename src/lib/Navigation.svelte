<script lang="ts">
	import type { NavigationItem } from '$lib/definition';
	import { Color } from '$lib/definition';
	import { IconBurger, IconIrocoLogo, IrocoLogo, NavBar } from '$lib';

	interface Props {
		baseUrl?: string;
		navigationItems: Array<NavigationItem>;
		type?: 'sidebar' | 'topbar';
		title?: string | null;
		version?: string | null;
		color?: Color | string;
		currentRoute?: string | null;
	}

	let {
		baseUrl = '',
		navigationItems,
		type = 'topbar',
		title = '',
		version = '',
		color = Color.green,
		currentRoute = '/foo'
	}: Props = $props();

	let showMenu = $state(false);
	let href = $derived(`${baseUrl}/`);
</script>

<div class="navigation--mobile">
	<div class="navigation--mobile__title-container">
		{#if title == null}
			<IrocoLogo {href} width="10em" height="10em" />
		{:else}
			<IconIrocoLogo {href} width="3em" height="3em" {color} />
			<h1><a {href} class="navigation-mobile__title-link">{title}</a></h1>
		{/if}
	</div>

	<button title="Menu button" onclick={() => (showMenu = true)} class="navigation--mobile__button">
		<IconBurger width="3em" height="3em" />
	</button>

	{#if showMenu}
		<NavBar
			{navigationItems}
			{currentRoute}
			{type}
			{version}
			onclick_link={() => (showMenu = false)}
			onclick={() => (showMenu = false)}
		/>
	{/if}
</div>

<div class="navigation">
	<div class="navigation__title-container">
		{#if title == null}
			<IrocoLogo {href} width="10em" height="10em" />
		{:else}
			<IconIrocoLogo {href} width="3em" height="3em" />
			<h1><a class="navigation__title-link" {href}>{title}</a></h1>
		{/if}
	</div>
	<NavBar {navigationItems} {currentRoute} {type} {version} />
</div>

<style lang="scss">
	@use './scss/containers';

	.navigation {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		&--mobile {
			display: none;
		}

		&__title-container {
			display: flex;
			align-items: center;
			padding-left: 1em;

			h1 {
				padding-left: 1em;
			}
		}
	}

	@include containers.screen-tablet {
		.navigation {
			display: none;
			color: var(--color-text);

			&--mobile {
				display: flex;
				padding: 0 1em;
				justify-content: space-between;
				position: fixed;
				top: 0;
				z-index: 1;
				width: 100%;
				border-bottom: 1px solid var(--color-border);

				h1 {
					font-size: 2em;
				}

				&__button {
					background-color: transparent;
					border: none;
					color: var(--color-icon-primary);
				}

				&__title-container {
					display: flex;
					align-items: center;

					h1 {
						padding-left: 0.5em;
					}
				}
			}
		}
	}

	.navigation__title-link,
	.navigation-mobile__title-link {
		color: var(--color-text-light);
	}
</style>
