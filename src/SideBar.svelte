<script lang="ts">
	import IconClose from './IconClose.svelte';
	import type { NavigationItem } from 'definition';

	export let navigationItems: Array<NavigationItem>;
</script>

<nav data-testid="sidebar" class="account__sidebar">
	<button on:click class="account__sidebar__close">
		<IconClose width="3em" height="3em" />
	</button>

	<ul class="account__sidebar__item_container">
		{#each navigationItems as { destination, name }}
			<li class="account__sidebar__item">
				<a href={destination}> {name}</a>
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
		position: fixed;
		top: 70px;
		z-index: 1;
		overflow-x: hidden;
		&__item_container {
			margin: 0;
			padding: 0;
			width: 100%;
			height: 100%;
		}

		&__item {
			padding: 2em 0;
			text-decoration: none;
			font-size: 0.75em;
			border-top:  1px solid colors.$darkBeige;
			display: block;
			a {
				padding-left: 1em;
			}
			&:hover {
				background-color: colors.$darkBeige;
			}
			&:hover a {
				color: colors.$darkBlue;
			}

			&:last-child {
				border-bottom: 1px solid colors.$darkBeige;
			}

			&:first-child {
				border: none;
			}
		}

		&__item a {
			color: colors.$beige;
			font-size: 2em;
		}

		&__close {
			display: none;
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
