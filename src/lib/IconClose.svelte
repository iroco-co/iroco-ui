<script lang="ts">
	interface Props {
		width?: string;
		height?: string;
	}

	let { width = '5rem', height = '5rem' }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	role="img"
	aria-label="Close icon"
	{width}
	{height}
	fill="none"
	viewBox="0 0 24 24"
	stroke="currentColor"
>
	<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
</svg>
