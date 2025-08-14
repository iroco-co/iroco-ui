<!--

	- 2025-08-14 : Migrate to Svelte 5 syntax
	- 2025-08-14 : Rename from Check to StepIconCheck

	Copyright (c) 2025, Iroco. All rights reserved.
  Use of this source code is governed by a BSD-style license that can be found
  in the LICENSE file.

  ---

  Copyright (c) 2021, Jingshao Chen. All rights reserved.
  Use of this source code is governed by a BSD-style license that can be found
  in the LICENSE file.

  https://github.com/shaozi/svelte-steps
-->
<script lang="ts">
	interface Props {
		stroke?: string;
	}

	let { stroke = 'currentColor' }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="1em"
	height="1em"
	viewBox="0 0 24 24"
	fill="none"
	{stroke}
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class="feather feather-check"
>
	<polyline points="20 6 9 17 4 12" />
</svg>
