<script lang="ts">
	import 'carbon-components-svelte/css/all.css';

	import { page } from '$app/stores';
	import { Grid, Row } from 'carbon-components-svelte';
	import { DateTime } from 'luxon';
	/// util
	import { generateWeekRowObj, IWeekRow, IDayCellItem, ITaskNode } from '$libs/calender-utils';

	/// components
	import DayCell from '$components/calender/day-cell.svelte';
	/// client-side
	console.log($page);
	let dayRangeArray: Array<IWeekRow> = [];
	let startDate: DateTime = DateTime.now().startOf('month');
	let endDate: DateTime = DateTime.now().endOf('month');
	let dateParse: string[] = [];
	if ($page.params.dateRange) {
		dateParse = /(.*)\:(.*)/g.exec($page.params.dateRange);
		startDate = !!dateParse && !!dateParse[1] ? DateTime.fromISO(dateParse[1]) : startDate;
		endDate = !!dateParse && !!dateParse[2] ? DateTime.fromISO(dateParse[2]) : endDate;
	}

	dayRangeArray = generateWeekRowObj(DateTime.now(), startDate, endDate, []);
	// console.log({ dayRangeArray });
	let isSelecting: boolean = false;

	// event function
	const longPress = () => (isSelecting = true);
  
</script>

<svelte:head>
	<title>Calender</title>
</svelte:head>

<section class="bx--grid">
	<Row>
		props: {JSON.stringify($page.params)}
	</Row>
	<!-- <Grid class="calender-grid"> -->
	{#each dayRangeArray as weekRow}
		<Row class="week-row">
			<span class="weekday-label">{weekRow[0].date.weekNumber} </span>
			{#each weekRow as dayCellItem}
				<DayCell
					{...dayCellItem}
					{isSelecting}
					dataWeekday={dayCellItem.date.weekday}
					on:day-longPress={longPress}
				/>
			{/each}
		</Row>
	{/each}
	<!-- </Grid> -->
</section>

<style lang="scss" global>
	.calender-grid {
		display: flex;
		flex-direction: column;
	}
	.week-row {
		display: flex;
	}
	.weekday-label {
		flex: 0 1 1.5rem;
	}
	.day-cell {
		flex: 1;
		min-height: 10rem;
	}

	.calender-container {
		height: #{'calc(100vh - 7rem)'};
		overflow: hidden scroll;
		@media screen and (max-width: 66rem) {
			overflow: visible;
			margin: -1rem;
		}
	}

	.controller-row {
		position: sticky;
		top: 0;
		background: rgba(255, 255, 255, 0.8);
		z-index: 2;
	}

	.calender-view {
		@media screen and (max-width: 66rem) {
			padding-left: 0;
			padding-right: 0;
		}
	}
	.calender-view-ctrl {
		justify-content: space-between;
	}

	.control-left {
		justify-self: flex-start;
		flex: 0 1;
		display: flex;
	}

	.control-mid {
		justify-self: center;
		flex: 0 1;
		display: flex;
	}

	.control-right {
		justify-self: flex-end;
		flex: 0 1;
		display: flex;
	}

	.week-number-indicator {
		display: block;
		flex: 0 1 35px;

		@media screen and (max-width: 66rem) {
			display: none;
		}
	}

	.weeky-day-row {
		position: sticky;
		top: 2rem;
		background: rgba(255, 255, 255, 0.8);
		z-index: 2;

		.day-cell {
			line-height: 2rem;
		}
	}

	.week-number-disp {
		padding-top: 1rem;
	}
</style>
