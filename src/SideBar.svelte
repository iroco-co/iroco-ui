<script lang="ts">
	import IconClose from './IconClose.svelte';
	import type { NavigationItem } from 'definition';

	export let navigationItems: Array<NavigationItem>;
	import { createEventDispatcher } from 'svelte';

	let active: string;

	const dispatch = createEventDispatcher();

	const handleClickLink = (destination: string) => {
	  active = destination;
	  dispatch('click_link');
	};
</script>

<nav data-testid="sidebar" class="account__sidebar">
	<button on:click class="account__sidebar__close">
		<IconClose width="3em" height="3em" />
	</button>

	<ul class="account__sidebar__item_container">
		{#each navigationItems as { destination, name }}
			<li class="account__sidebar__item" class:active={active === destination}>
				<a on:click={() => handleClickLink(destination)} href={destination}> {name}</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	@use '../scss/colors';
	@import '../scss/containers';

	.account__sidebar {
		height: 100%;
		width: 300px;
		position: absolute;
		top: 70px;
		z-index: 1;
		overflow-x: hidden;
		border-right: 1px solid colors.$mediumGrey;
		&__item_container {
			margin: 0;
			padding: 0;
			width: 100%;
			height: 100%;
		}
		&__item {
			padding: 2em 2em;
			text-decoration: none;
			font-size: 0.75em;
			display: block;
			border-top: 1px solid colors.$mediumGrey;
			border-bottom: 1px solid colors.$mediumGrey a {
				padding-left: 1em;
			}
		}

		&__item a {
			color: colors.$beige;
			font-size: 2em;
		}

		&__close {
			display: none;
		}

		.active {
			border-top: 1px solid colors.$green;
			border-bottom: 1px solid colors.$green;
		}
	}

	@include screen-tablet {
		.account__sidebar {
			position: fixed;
			background-color: colors.$darkBlue;
			top: 0;
			right: 0;
			width: 100%;
			padding: 0;
			padding-top: 2em;
			margin: 0;
			border-right: none;
			&__item_container {
				padding: 0em;
				margin-top: 2rem;
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
</style>
