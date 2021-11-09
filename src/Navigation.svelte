<script lang="ts">
	import type { NavigationItem } from '../definition';
	import IconBurger from './IconBurger.svelte';
	import IconIrocoLogo from './IconIrocoLogo.svelte';
	import SideBar from './SideBar.svelte';

	export let navigationItems: Array<NavigationItem>;
	export let title: string;

	let showMenu = false;
</script>

<div class="account__navigation--mobile">
	<div class="account__navigation--mobile__title-container">
		<IconIrocoLogo width="3em" height="3em" />
		<h1>{title}</h1>
	</div>

	<button on:click={() => (showMenu = true)} class="account__navigation--mobile__button">
		<IconBurger width="3em" height="3em" />
	</button>

	{#if showMenu}
		<SideBar on:click={() => (showMenu = false)} {navigationItems} />
	{/if}
</div>

<div class="account__navigation">
	<div class="account__navigation__title-container">
		<IconIrocoLogo width="3em" height="3em" />
		<h1>{title}</h1>
	</div>
	<SideBar {navigationItems} />
</div>

<style lang="scss">
	@use '../scss/colors';
	@import '../scss/containers';
	.account__navigation {
		display: block;
		width: 100%;
		border-bottom: 1px solid colors.$darkBeige;
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
		.account__navigation {
			display: none;
			color: colors.$beige;
			&--mobile {
				display: flex;
				padding: 0 1em;
				justify-content: space-between;
				position: fixed;
				top: 0;
				width: 100%;
				border-bottom: 1px solid colors.$darkBeige;

				h1 {
					font: bold;
					font-size: 2em;
				}
				&__button {
					background-color: transparent;
					border: none;
					color: colors.$darkBeige;
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
</style>
