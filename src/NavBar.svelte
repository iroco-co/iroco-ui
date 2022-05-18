<script lang="ts">
	import IconClose from './IconClose.svelte';
	import type { NavigationItem } from 'definition';
	import { createEventDispatcher } from 'svelte';

	export let navigationItems: Array<NavigationItem>;
	export let type: 'sidebar' | 'topbar';

	let active: string;
	const dispatch = createEventDispatcher();

	const handleClickLink = (menuItem: NavigationItem) => {
	  active = menuItem.name;
	  if (typeof menuItem.hrefOrCallback === "function") {
	  	menuItem.hrefOrCallback()
	  	return false // to avoid calling href
	  }
	  dispatch('click_link');
	};
</script>

<nav data-testid={type} class='nav__{type}'>
	<button on:click class="nav__{type}__close">
		<IconClose width="3em" height="3em" />
	</button>

	<ul class="nav__{type}__item-container">
		{#each navigationItems as item}
			<li class="nav__{type}__item" class:active={active === item.name}>
				<a on:click={() => handleClickLink(item)} href={typeof item.hrefOrCallback === 'string' ? item.hrefOrCallback: '#'}> {item.name}</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	@use '../scss/colors';
	@import '../scss/containers';

	.nav {
		&__sidebar, &__topbar {
			&__item {
				text-decoration: none;
				font-size: 0.75em;
				display: block;

			}
			&__item a {
				color: colors.$beige;
				font-size: 2em;
			}
		}

		&__sidebar {
			height: 100%;
			width: 300px;
			position: absolute;
			overflow-x: hidden;
			border-right: 1px solid colors.$mediumGrey;
			&__item_container {
				margin: 0;
				padding: 0;
				width: 100%;
				height: 100%;
			}
			&__item {
				padding: 2em;
				border-top: 1px solid colors.$mediumGrey;
			}
			&__close {
				display: none;
			}
			.active {
				border-top: 1px solid colors.$green;
				border-bottom: 1px solid colors.$green;
			}
		}
		&__topbar {
			flex-grow: 1;
			display: flex;
			justify-content: flex-end;
			ul, li {
				display: inline;
			}
			ul {
				display: flex;
				flex-grow: 1;
				justify-content: space-around;
			}
			&__close {
				display: none;
			}
		}
	}

	@include screen-tablet {
		.nav {
			&__sidebar, &__topbar {
				position: fixed;
				background-color: colors.$darkBlue;
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
				ul, li {
					display: block;
				}
				&__close {
					display: block;
					position: absolute;
					right: 0;
					top: 0;
					background-color: transparent;
					border: none;
					color: colors.$darkBeige;
				}
			}
		}
	}
</style>
