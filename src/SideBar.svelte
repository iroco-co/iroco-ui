<script lang="ts">
	import IconClose from './IconClose.svelte';
	import type { NavigationItem } from 'definition';

	export let navigationItems: Array<NavigationItem>;
</script>

<div data-testid="sidebar" class="account__sidebar">
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
</div>

<style lang="scss">
	@use "../scss/colors";
	@import '../scss/containers';

	.account__sidebar {
		height: 100%;
		width: 300px;
		background-color: colors.$darkBlue;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		overflow-x: hidden;
		&__item_container {
			padding: 2em;
			margin: 0;
			width: 100%;
			height: 100%;
		}

		&__item {
			padding: 1em 1.5em;
			text-decoration: none;
			font-size: 1em;
			border-top: 1px solid colors.$beige;
			display: block;
			&:hover {
				background-color: colors.$beige;
			}
			&:hover a {
				color: colors.$darkBlue;
			}

			&:last-child {
				border-bottom: 1px solid colors.$beige;
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
				color: colors.$beige;
			}
		}
	}
</style>
