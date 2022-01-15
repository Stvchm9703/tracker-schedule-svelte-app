<script lang="ts">
	import { Tile, SelectableTile, Tooltip } from 'carbon-components-svelte';
	import { DateTime } from 'luxon';
	import { createEventDispatcher } from 'svelte';

	// import { fromString } from 'uuidv4';
	import longpress from '$actions/long-press';

	const dispatch = createEventDispatcher();
	// props
	export let date: DateTime = DateTime.now();
	export let events: Array<any> = [];
	export let isSelecting: boolean = false;
	export let isSelected: boolean = false;
	// export let dataWeekday: number = 0;

	// data

	// compute
	$: cellId = date.toISODate();
	$: isToday = date.toISODate() === DateTime.now().toISODate();
	$: isCurrentMonth = date.month === DateTime.now().month;
	// event
	const onMouseClick = (e) => dispatch('day-click', date);
	const onLongPress = (e) => dispatch('day-longPress');
</script>

<div
	id={`day-cell-${cellId}`}
	class="day-cell"
	class:isToday
	use:longpress
	on:click={onMouseClick}
	on:long={onLongPress}
>
	{#if !isSelecting}
		<Tile class={`day-tile ${!isCurrentMonth ? 'not-in-month' : ''}`}>
			<Tooltip
				hideIcon
				triggerText={`${date.day}`}
				class={`day-label ${isToday ? 'is-today' : ''}`}
				align="start"
				direction="top"
			>
				<span class="text">{date.toISODate()}</span>
			</Tooltip>
			<div class="task-list">
				{#each events.slice(0, 4) as event}
					<span class="task-item" />
				{/each}
				{#if events.length > 4}
					<span class="task-more-item">
						more+ {events.length - 4}
					</span>
				{/if}
			</div>
		</Tile>
	{:else}
		<SelectableTile
			class={`day-tile ${!isCurrentMonth ? 'not-in-month' : ''}`}
			value={date.toISODate()}
			selected={isSelected}
		>
			<!-- <span class="day-label" class:is-today={isToday}>{date.day}</span> -->
			<Tooltip
				hideIcon
				triggerText={`${date.day}`}
				class={`day-label ${isToday ? 'is-today' : ''}`}
				align="start"
				direction="top"
			>
				<span class="text">{date.toISODate()}</span>
			</Tooltip>
			<div class="task-list">
				{#each events.slice(0, 4) as event}
					<span class="task-item" />
				{/each}
				{#if events.length > 4}
					<span class="task-more-item">
						more+ {events.length - 4}
					</span>
				{/if}
			</div>
		</SelectableTile>
	{/if}
</div>

<style lang="scss" global>
	@import '@carbon/colors/scss';
	/* your styles go here */
	.day-tile {
		// display: flex;
		height: 100%;
		transition: background-color 0.4s ease-in-out;
		min-width: 0;
		min-height: 0;
		@media screen and (max-width: 640px) {
			padding: 0;
		}

		&:hover {
			background-color: $cool-gray-10-hover;

			.day-label {
				background-color: $cool-gray-20-hover;

				&.is-today {
					background-color: $blue-60-hover;
					// color: $white-0;
					// .text {
					// 	color: $white-0;
					// }
				}
			}
		}

		&.not-in-month {
			background-color: $cool-gray-20;
			color: $cool-gray-90;

			&:hover {
				background-color: $cool-gray-20-hover;
			}
		}
		@media screen and(max-width:640px) {
			&.is-today {
				background-color: $blue-60;
				// color: $white-0;
			}
		}

		// Selectable-Tile
		@media screen and(max-width:66rem) {
			:global(.bx--tile__checkmark) {
				top: 0;
				right: 0;
				height: 1rem;
			}
		}
	}

	.day-label {
		display: block;
		width: 2rem;
		height: 2rem;
		line-height: 2rem;
		margin-top: -1rem;
		margin-left: -1rem;
		text-align: center;
		transition: background-color 0.4s ease-in-out;
		@media screen and (max-width: 640px) {
			display: block;
			margin-top: auto;
			margin-left: auto;
			margin: auto;
			text-align: center;
			width: 100%;
			height: 100%;
			line-height: 2.5rem;
		}

		&.is-today {
			background-color: $blue-60;
			color: $white-0;
			.text {
				color: $white-0;
			}
      .bx--tooltip__label{
        color: $white-0;
      }
		}
		.bx--tooltip {
			padding: 0.5rem;
		}
		.bx--tooltip__label {
			width: 100%;
			width: 2rem;
			height: 2rem;
			line-height: 2rem;
			text-align: center;
			justify-content: center;
		}
		.text {
			width: 100%;
			text-align: center;
		}
	}

	.task-list {
		display: flex;
		flex-wrap: wrap;
		position: relative;
		top: -1.8rem;

		@media screen and (max-width: 66rem) {
			display: none;
		}
	}

	.task-item {
		display: block;
		background-color: $cool-gray-70;
		height: 1rem;
		width: 1rem;
		transform: rotateZ(45deg);
		margin: 0.4rem -0.2rem;
		cursor: pointer;

		&:hover {
			background-color: $blue-70-hover;
		}

		&:first-of-type {
			margin-left: 1.4rem;
		}
	}

	.task-more-item {
		padding: 0.3rem 0.5rem;
		margin-left: 0.35rem;
		margin-top: -0.1rem;
		line-height: 1.4rem;
		cursor: pointer;

		&:hover {
			color: $blue-70-hover;
			background-color: $cool-gray-20-hover;
		}
	}
</style>
