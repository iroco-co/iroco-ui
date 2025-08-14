<!--

	- 2025-08-07 : Use Iroco CSS var for steps label
	- 2025-08-14 : Migrate to Svelte 5 syntax
	- 2025-08-14 : Migrate to Typescript

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
	import { run } from 'svelte/legacy';

	// A bootstrap step component
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	import { createEventDispatcher } from 'svelte';
	import StepIconCheck from './StepIconCheck.svelte';
	import StepIconAlert from './StepIconAlert.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {any} steps
	 * @property {number} [current]
	 * @property {boolean} [vertical]
	 * @property {any} [size]
	 * @property {any} [line]
	 * @property {any} [lineHeight]
	 * @property {string} [primary]
	 * @property {string} [secondary]
	 * @property {string} [light]
	 * @property {string} [dark]
	 * @property {string} [borderRadius]
	 * @property {string} [fontFamily]
	 * @property {boolean} [reverse]
	 * @property {boolean} [clickable]
	 * @property {any} [checkIcon]
	 * @property {any} [alertIcon]
	 * @property {string} [alertColor]
	 * @property {boolean} [htmlMode]
	 */
	interface Props {
		/**
		 *
		 * 	- Array of object. Length has to be more than 1
		 * 	- Required
		 * 	- Each item is a step object that can have:
		 * 		- `text`: The text displayed below each steps.
		 * 		- `icon`: A svelte component displayed inside each steps.
		 * 	  - `iconProps`: An object that will be passed as props to the `icon` component.
		 */
		steps: { text: string; alert?: boolean; icon?: boolean; iconProps?: any }[];
		/** Current step index. Default `0` */
		current: number;
		/** When set to `false`, Clicking icons and labels will not change step. You have to change `current` to change step. Default `true` */
		clickable: boolean;

		/** Vertical steps */
		vertical: boolean;
		/** For horizontal steps, reverse the step from right to the left; for vertical steps, reverse puts text labels to the left. Default `false` */
		reverse: boolean;

		/** size of the step buttons. String. Default `"3rem"` */
		size: string;
		/** thickness of the connecting lines between the step buttons. String. Default `"0.3rem"` */
		line: string;
		/** Primary color of passed and current steps. String. Default `'var(--bs-primary, #3a86ff)'` */
		primary: string;
		/** Secondary color of future steps. String. Default `'var(--bs-secondary, #bbbbc0)'` */
		secondary: string;
		/** Primary color of text color in passed anc current steps. String. Default `'var(--bs-light, white)'` */
		light: string;
		/** Secondary color of text color in future steps. String. Default `'var(--bs-dark, black)'` */
		dark: string;
		/** Border radius of the step buttons. String. Default `'50%'` (circle) */
		borderRadius: string;
		/** Font family of the component. String. Default `"'Helvetica Neue', Helvetica, Arial, sans-serif"` */
		fontFamily: string;
		/** User defined check icon for passed steps. If not specified, use the default check mark. Set to `null` if you don't want a check icon. */
		checkIcon: any;
		/** User defined alert icon for passed steps that has truthful `alert` property. If not specified, use the default alert icon. Set to `null` if you don't want an alert icon. */
		alertIcon: any;
		/** User defined bg color for passed steps that has truthful `alert` property. Default 'var(--bs-danger, #dc3545)' */
		alertColor: string;
		/** Evaluates step test as HTML */
		htmlMode: boolean;
	}

	/** @type {Props} */
	let {
		steps,
		current = $bindable(0),
		vertical = false,
		size = vertical ? '2rem' : '3rem',
		line = $bindable(vertical ? '0.15rem' : '0.3rem'),
		primary = 'var(--bs-primary, #3a86ff)',
		secondary = 'var(--bs-secondary, #bbbbc0)',
		light = 'var(--bs-light, white)',
		dark = 'var(--bs-dark, black)',
		borderRadius = '50%',
		fontFamily = '',
		reverse = false,
		clickable = true,
		checkIcon = StepIconCheck,
		alertIcon = StepIconAlert,
		alertColor = 'var(--bs-danger, #dc3545)',
		htmlMode = false
	} = $props();
		htmlMode = false,
	}: Props = $props();

	const minStepSize = '5rem';
	const stepLabelSpace = '1rem';

	// each segment is half of the step size

	// @type { height: number; width: number }[]
	let segmentSizes = $state([]);
	for (let i = 0; i < steps.length; i++) {
		segmentSizes.push({ height: 0, width: 0 });
	}

	if (current > steps.length - 1) {
		current = steps.length - 1;
	}
	if (current < 0) {
		current = 0;
	}

	let progress = tweened(current, { duration: 400, easing: cubicOut });
	let total = $state(0);
	let key = vertical ? 'height' : 'width';

	function f(p /*@type number*/) {
		// 0 - 1: $p * (0 + 1)/2
		// 1 - 2: 1 * (0 + 1)/2 + ($p-1) * (1 + 2)/2
		// 2 - 3: (0 + 1)/2 + (1 + 2)/2 + ($p-2) * (2+3)/2
		let ret = 0;
		let i = 0;
		while (p > 1) {
			p--;
			ret += (segmentSizes[i][key] + segmentSizes[i + 1][key]) / 2;
			i++;
		}
		if (i < segmentSizes.length - 1) {
			ret += (p * (segmentSizes[i][key] + segmentSizes[i + 1][key])) / 2;
		}
		return ret;
	}

	let fill = $state(f(current));

	run(() => {
		total = 0;
		if (segmentSizes[0][key] > 0) {
			for (let i = 0; i < steps.length; i++) {
				total += segmentSizes[i][key];
			}
			total -= (segmentSizes[0][key] + segmentSizes[segmentSizes.length - 1][key]) / 2;
		}
		fill = f($progress);
	});
	run(() => {
		$progress = current;
	});
	const dispatch = createEventDispatcher();
	let onClick = (i /*: number*/) => {
		if (clickable) {
			let last = current;
			current = i;
			// $progress = i
			dispatch('click', { current, last });
		}
	};
</script>

<!--

  @component

  A customizable and accessible step component.

	## Usage

	```svelte
	<Steps
		aria_label="My steps"
		current={0}
		steps={[
			{test:"Foo"},
			{test:"Bar"},
			{test:"Baz"},
		]}
	/>
	```

  ## Events

  - `onclick(e)`: click event. Event detail object has two keys:
    - `e.detail.current`: the index of current step
    - `e.detail.last`: the index of last step

-->
<div
	class="steps-container"
	role="progressbar"
	aria-valuemin="1"
	aria-valuemax={`${(steps?.length ?? 0) + 1}`}
	aria-valuenow={`${(current ?? 0) + 1}`}
	aria-valuetext={`${steps[current]?.text}`}
	style={`--size: ${size};
      --line-thickness: ${line};
      --primary: ${primary}; 
      --secondary: ${secondary};
      --light: ${light};
      --dark: ${dark};
      --danger: ${alertColor};
      --border-radius: ${borderRadius};
      --font-family: ${fontFamily || "'Helvetica Neue', Helvetica, Arial, sans-serif"};
    display: flex; 
    `}
	style:flex-direction={vertical ? (reverse ? 'row-reverse' : 'row') : 'column'}
>
	<!-- progress line container -->
	<div
		style="display: flex; align-items: center;"
		style:flex-direction={vertical ? 'column' : 'row'}
		style:width={vertical ? size : '100%'}
		style:min-width={vertical ? size : null}
		style:height={vertical ? '100%' : size}
		style:min-height={vertical ? null : size}
	>
		<div
			style:width={vertical ? line : `${segmentSizes[0].width / 2}px`}
			style:height={vertical ? `${segmentSizes[0].height / 2}px` : line}
		></div>
		<div
			style:width={vertical ? line : `${total}px`}
			style:height={vertical ? `${total}px` : line}
			class="bg-secondary"
			style="display: flex; align-items:center;"
			style:flex-direction={vertical ? 'column' : reverse ? 'row-reverse' : 'row'}
		>
			<div
				class="bg-primary"
				style:width={vertical ? line : `${fill}px`}
				style:height={vertical ? `${fill}px` : line}
			></div>
			{#if line != size}
				<!-- the progress indicator -->
				<div class="bg-primary" style="width:8px; height:8px; border-radius: 50%;"></div>
			{/if}
		</div>
		<div
			style:width={vertical ? line : `${segmentSizes[0].width / 2}px`}
			style:height={vertical ? `${segmentSizes[0].height / 2}px` : line}
		></div>
	</div>
	<!--  progress line end -->
	<div
		style="display: flex; justify-content: space-between;"
		style:flex-direction={vertical ? 'column' : reverse ? 'row-reverse' : 'row'}
		style:margin-left={vertical ? (reverse ? null : '-' + size) : null}
		style:margin-right={vertical ? (reverse ? '-' + size : null) : null}
		style:margin-top={vertical ? null : '-' + size}
	>
		{#each steps as step, i}
			<!-- step container -->
			<div
				style="display: flex; align-items:center; flex-grow: 10; width: 100%"
				style:flex-direction={vertical ? (reverse ? 'row-reverse' : 'row') : 'column'}
				bind:clientWidth={segmentSizes[i].width}
				bind:clientHeight={segmentSizes[i].height}
			>
				<!-- circle and text label -->
				<div
					style="display: flex; align-items: center; "
					style:flex-direction={vertical ? (reverse ? 'row-reverse' : 'row') : 'column'}
					style:min-width={vertical ? 'var(--size)' : minStepSize}
					style:min-height={vertical ? minStepSize : 'var(--size)'}
				>
					<!-- circle -->
					<button
						class="step
              {i <= $progress ? (step.alert ? 'bg-danger' : 'bg-primary') : 'bg-secondary'} 
              text-light
              "
						class:hover-highlight={clickable}
						class:shadow={i == current}
						onclick={() => {
							onClick(i);
						}}
					>
						{#if step.icon}
							{#if i < $progress}
								{#if step.alert}
									{#if alertIcon}
										{@const SvelteComponent = alertIcon}
										<SvelteComponent />
									{:else if step.iconProps}
										<step.icon {...step.iconProps} />
									{:else}
										<step.icon />
									{/if}
								{:else if checkIcon}
									{@const SvelteComponent_1 = checkIcon}
									<SvelteComponent_1 />
								{:else if step.iconProps}
									<step.icon {...step.iconProps} />
								{:else}
									<step.icon />
								{/if}
							{:else if step.iconProps}
								<step.icon {...step.iconProps} />
							{:else}
								<step.icon />
							{/if}
						{:else if i < $progress}
							{#if step.alert}
								{#if alertIcon}
									{@const SvelteComponent_2 = alertIcon}
									<SvelteComponent_2 />
								{:else}
									<span class="steps__number">{i + 1}</span>
								{/if}
							{:else if checkIcon}
								{@const SvelteComponent_3 = checkIcon}
								<SvelteComponent_3 />
							{:else}
								<span class="steps__number">{i + 1}</span>
							{/if}
						{:else}
							<span class="steps__number">{i + 1}</span>
						{/if}
					</button>
					<!-- text label -->
					{#if typeof step.text != 'undefined'}
						<button
							class="steps__label"
							class:hover-highlight={clickable}
							style:margin-left={vertical ? (reverse ? null : stepLabelSpace) : null}
							style:margin-right={vertical ? (reverse ? stepLabelSpace : null) : null}
							style:margin-top={vertical ? null : stepLabelSpace}
							style:text-align={vertical ? (reverse ? 'right' : 'left') : 'center'}
							onclick={() => {
								onClick(i);
							}}
						>
							<div class:text-primary={i <= $progress}>
								{#if htmlMode}
									{@html step.text}
								{:else}
									{step.text}
								{/if}
							</div>
						</button>
					{:else}
						{''}
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.steps-container {
		font-family: var(--font-family);
		box-sizing: border-box;
	}

	.step {
		border-width: 0;
		border-radius: var(--border-radius);
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--size);
		min-width: var(--size);
		height: var(--size);
		min-height: var(--size);
		font-size: calc(var(--size) * 0.5);
	}

	.hover-highlight:hover {
		cursor: pointer;
		filter: brightness(85%);
		box-sizing: border-box;
	}

	.steps__label {
		border-width: 0;
		background-color: transparent;
		font-size: larger;
		box-sizing: border-box;
		color: var(--color-text);
	}

	.text-primary {
		color: var(--primary) !important;
	}

	.text-light {
		color: var(--light) !important;
	}

	.bg-secondary {
		background-color: var(--secondary) !important;
	}

	.bg-primary {
		background-color: var(--primary) !important;
	}

	.bg-danger {
		background-color: var(--danger) !important;
	}

	.shadow {
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
	}
</style>
