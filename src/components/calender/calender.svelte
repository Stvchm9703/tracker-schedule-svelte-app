<script lang="ts">
	import 'carbon-components-svelte/css/all.css';

	import { Row } from 'carbon-components-svelte';
	import { DateTime } from 'luxon';
	/// util
	import { generateWeekRowObj, IWeekRow, IDayCellItem, ITaskNode } from '$libs/calender-utils';
	import calenderScroll from '$actions/calender-scroll';
	/// components
	import DayCell from '$components/calender/day-cell.svelte';
	/// client-side
	let dayRangeArray: Array<IWeekRow> = [];
	export let startDate: DateTime = DateTime.now().startOf('month');
	export let endDate: DateTime = DateTime.now().endOf('month');
	export let taskList: Array<ITaskNode> = [];

	dayRangeArray = generateWeekRowObj(DateTime.now(), startDate, endDate, taskList);
	// console.log({ dayRangeArray });
	let isSelecting: boolean = false;

	// event function
	const longPress = () => {
		console.log('longPress');
		isSelecting = true;
	};
	const weekRowScroll = (e) => {
		console.log('scoll');
		const { direction } = e.detail;
		console.log('update week', direction);
		startDate = startDate.plus({ week: 6 * -direction });
		endDate = endDate.plus({ week: 6 * -direction });
		dayRangeArray = generateWeekRowObj(DateTime.now(), startDate, endDate, taskList);
	};
</script>

<div class="week-container" use:calenderScroll={8} on:calender-scroll={weekRowScroll}>
	{#each dayRangeArray as weekRow}
		<Row class="week-row">
			<span class="weekday-label">{weekRow[0].date.weekNumber} </span>
			{#each weekRow as dayCellItem}
				<DayCell {...dayCellItem} {isSelecting} on:day-longPress={longPress} />
			{/each}
		</Row>
	{/each}
</div>
