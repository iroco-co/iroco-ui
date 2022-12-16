<script lang="ts">
	// from https://github.com/the-pudding/svelte-starter/blob/master/src/components/helpers/Icon.svelte
	import feather from 'feather-icons';
	export let name: string;
	export let stroke: string;
	export let strokeWidth: string;
	export let width = '1em';
	export let height = '1em';
	export let color = 'white';
	const icon = feather.icons[name];
	$: if (icon) {
		if (stroke) icon.attrs['stroke'] = stroke;
		if (strokeWidth) icon.attrs['stroke-width'] = strokeWidth;
	}
</script>

{#if icon}
	<svg {...icon.attrs} style="width: {width}; height: {height}; color: {color};">
		<g>
			{@html icon.contents}
		</g>
	</svg>
{/if}

<style>
	svg {
		overflow: visible;
	}
</style>
