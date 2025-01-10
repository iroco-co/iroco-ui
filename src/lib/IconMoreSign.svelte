<script lang="ts">
	interface Props {
		width?: string;
		height?: string;
	}

	let { width = '3rem', height = '3rem' }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{height}
	{width}
	fill="none"
	viewBox="0 0 24 24"
	stroke="currentColor"
>
	<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
</svg>
