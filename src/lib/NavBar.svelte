<script lang="ts">
	import { IconClose } from '$lib/index';
	import { createEventDispatcher } from 'svelte';
	import { NavigationItemType, NavigationItem } from '$lib/definition.js';
	import type { MouseEventHandler } from 'svelte/elements';

	interface Props {
		navigationItems: Array<NavigationItem>;
		type: 'sidebar' | 'topbar';
		version?: string | null;
		navigating?: { to: { url: { pathname: string } } } | null;
		onclick?: MouseEventHandler<HTMLButtonElement>;
	}

	let { navigationItems, type, version = null, navigating = null, onclick }: Props = $props();

	const dispatch = createEventDispatcher();

	const handleClickLink = (menuItem: NavigationItem) => {
		if (typeof menuItem.hrefOrCallback === 'function') {
			menuItem.hrefOrCallback();
			return false; // to avoid calling href
		}
		dispatch('click_link');
	};

	function isActive(current: string, item: NavigationItem): boolean {
		if (typeof item.hrefOrCallback === 'string') {
			return item.hrefOrCallback === current;
		}
		return false;
	}

	let active = $derived(navigating?.to.url.pathname ?? '');
</script>

<nav data-testid={type} class="nav__{type}">
	<button title="Close menu" {onclick} class="nav__{type}__close">
		<IconClose width="3em" height="3em" />
	</button>

	<ul class="nav__{type}__item-container">
		{#each navigationItems as item}
			<li class="nav__{type}__item" class:active={isActive(active, item)}>
				{#if item.type === NavigationItemType.FORM}
					<form method="POST" action={item.hrefOrCallback}>
						<button class="iroco-ui-link" type="submit">{item.name}</button>
					</form>
				{:else}
					<a
						onclick={() => handleClickLink(item)}
						href={typeof item.hrefOrCallback === 'string' ? item.hrefOrCallback : '#'}
						class:iroco-ui-button={item.type === NavigationItemType.BUTTON}
						class:iroco-ui-button--small={item.type === NavigationItemType.BUTTON}
						class:iroco-ui-button--success={item.type === NavigationItemType.BUTTON}
					>
						{item.name}
					</a>
				{/if}
			</li>
		{/each}
	</ul>
	<div class="nav__version">{version == null ? '' : version}</div>
</nav>

<style lang="scss">

  @use './scss/constants';
  @use './scss/containers';
  @use './scss/button';

  .nav {
    &__sidebar,
    &__topbar {
      &__item {
        text-decoration: none;
        display: block;
        font-size: 1em;
      }

      &__close {
        display: none;
      }
    }

    &__sidebar {
      height: 100%;
      width: 300px;
      position: absolute;
      top: 4.45em;
      left: 0;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;

      &__item-container {
        margin: 0;
        padding: 0;
      }

      &__item {
        padding: 2em;
        border-top: 1px solid var(--color-border);
      }

      &__item:first-child {
        border-top: none;
      }

      .active {
        border-top: 1px solid var(--color-primary);
        border-bottom: 1px solid var(--color-primary);
      }
    }

    &__topbar {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;

      ul,
      li {
        display: inline;
      }

      ul {
        display: flex;
        flex-grow: 1;
        justify-content: space-around;
      }

      .active {
        border-bottom: 1px solid var(--color-primary);
      }
    }

    &__version {
      margin-top: auto;
      padding-left: 2em;
      color: var(--color-text-dark);
    }
  }

  @include containers.screen-tablet {
    .nav {
      &__sidebar,
      &__topbar {
        position: fixed;
        background-color: var(--color-body);
        top: 0;
        right: 0;
        width: 100%;
        padding: 0;
        padding-top: 2em;
        margin: 0;
        border-right: none;

        &__item-container {
          padding: 0em;
          margin-top: 2rem;
        }

        ul,
        li {
          display: block;
        }

        &__close {
          display: block;
          position: absolute;
          right: 0;
          top: 0;
          background-color: transparent;
          border: none;
          color: var(--color-icon-primary);
        }
      }

      &__sidebar {
        top: 0;
        left: 0;

        &__item:first-child {
          border-top: 1px solid var(--color-border);
        }
      }

      &__topbar {
        height: 100%;

        &__item {
          padding: 2em;
          border-top: 1px solid var(--color-border);
        }
      }

      &__version {
        display: none;
      }
    }
  }
</style>
