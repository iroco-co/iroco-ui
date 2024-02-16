<script lang="ts">
	import type { NavigationItem } from './definition';
	import IconBurger from './IconBurger.svelte';
	import IconIrocoLogo from './IconIrocoLogo.svelte';
	import IrocoLogo from './IrocoLogo.svelte';
	import NavBar from './NavBar.svelte';
	import { Color } from './definition';
	import { base } from '$app/paths';

	export let href = `${base}/`;
	export let navigationItems: Array<NavigationItem>;
	export let type: 'sidebar' | 'topbar' = 'topbar';
	export let title: string | null = null;
	export let version: string | null = null;
	export let color: Color = Color.green;
	let showMenu = false;
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

	<button title="Menu button" on:click={() => (showMenu = true)} class="navigation--mobile__button">
		<IconBurger width="3em" height="3em" />
	</button>

	{#if showMenu}
		<NavBar
			on:click_link={() => (showMenu = false)}
			on:click={() => (showMenu = false)}
			{type}
			{navigationItems}
			{version}
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
	<NavBar {navigationItems} {type} {version} />
</div>

<style lang="scss">
  @use './scss/colors';
  @import './scss/containers';

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

  @include screen-tablet {
    .navigation {
      display: none;
      color:var(--color-text);

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

  .navigation__title-link, .navigation-mobile__title-link {
    color: var(--color-text-light);
  }
</style>
