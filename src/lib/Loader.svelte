<script lang="ts">
	import IconIrocoLogo from './IconIrocoLogo.svelte';
</script>

<div class="rotate linear infinite">
	<IconIrocoLogo width="4em" height="4em" />
</div>

<style>
	.rotate {
		animation: rotation 2s;
	}

	.linear {
		animation-timing-function: linear;
	}

	.infinite {
		animation-iteration-count: infinite;
	}

	@keyframes rotation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}
</style>
