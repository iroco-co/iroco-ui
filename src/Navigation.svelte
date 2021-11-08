<script lang="ts">
	import type { NavigationItem } from '../definition';
	import IconBurger from './IconBurger.svelte';
	import SideBar from './SideBar.svelte';

	export let navigationItems: Array<NavigationItem>;

	let showMenu = false;
</script>

<nav class="account__navigation--mobile">
	<button on:click={() => (showMenu = true)} class="account__navigation--mobile__button">
		<IconBurger width="3em" height="3em" />
	</button>

	{#if showMenu}
		<SideBar on:click={() => (showMenu = false)} {navigationItems} />
	{/if}
</nav>

<nav class="account__navigation">
	<SideBar {navigationItems} />
</nav>

<style lang="scss">
	@use "../scss/colors";
	@import '../scss/containers';
	.account__navigation {
		display: block;
		&--mobile {
			display: none;
		}
	}

	@include screen-tablet {
		.account__navigation {
			display: none;
			&--mobile {
				display: block;
				position: fixed;
				top: 0;
				width: 100%;
				&__button {
					background-color: transparent;
					border: none;
					color: colors.$beige;
				}
			}
		}
	}
</style>
