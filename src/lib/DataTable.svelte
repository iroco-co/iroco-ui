<script type="module" lang="ts">
	import type { SvelteComponent } from 'svelte';
	type TableColumn = {
		key: string;
		title: string;
		renderComponent?: {
			component: SvelteComponent;
			/* eslint-disable @typescript-eslint/no-explicit-any */
			props?: any;
		};
	};

	type TableRow = {
		[key: string]: string | number;
	};

	export let rows: Array<TableRow>;

	export let columns: Array<TableColumn>;
</script>

<table class="data-table">
	<thead class="data-table__header">
		<tr>
			{#each columns as column}
				<th class="data-table__header__cell">
					{column.title}
				</th>
			{/each}
		</tr>
	</thead>

	<tbody class="data-table__body">
		{#each rows as row}
			<tr class="data-table__body__row">
				{#each columns as { key, renderComponent }}
					<td class="data-table__body__cell">
						{#if renderComponent}
							<svelte:component
								this={renderComponent.component}
								on:click={() => renderComponent.props.onclick(row)}
							/>
						{:else}
							{row[key]}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	.data-table {
		border: 1px solid var(--color-border);
		width: 100%;
		&__header {
			font-size: 1.5em;
			height: 4rem;

			&__cell {
				border-bottom: 1px solid var(--color-border);
			}
		}
		&__body {
			&__cell {
				text-align: center;
				vertical-align: middle;
			}
		}
	}
</style>
