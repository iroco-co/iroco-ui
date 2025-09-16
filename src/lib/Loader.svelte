<script lang="ts">
	import { IconIrocoLogo } from '$lib/index';
</script>

<div class="rotate linear infinite width-fit-content transform-origin">
	<IconIrocoLogo width="4em" height="4em" />
</div>

<style>
    .width-fit-content {
        width: fit-content;
        margin: 0;
				padding: 0;
    }

		.transform-origin{
        transform-origin: 2.11em 1.76em;
		}
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
