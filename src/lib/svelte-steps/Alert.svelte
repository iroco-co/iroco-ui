<!--

	- 2025-08-14 : Migrate to Svelte 5 syntax

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
	class="feather feather-alert-triangle"
>
	<path
		d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
	/>
	<line x1="12" y1="9" x2="12" y2="13" />
	<line x1="12" y1="17" x2="12.01" y2="17" />
</svg>
