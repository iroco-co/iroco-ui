<script lang="ts">
	interface Props {
		width?: string;
		height?: string;
	}

	let { width = '5rem', height = '5rem' }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	role="button"
	aria-label="menu button"
	{width}
	{height}
	fill="none"
	viewBox="0 0 24 24"
	stroke="currentColor"
>
	<path
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		d="M4 6h16M4 12h16M4 18h16"
	/>
</svg>
