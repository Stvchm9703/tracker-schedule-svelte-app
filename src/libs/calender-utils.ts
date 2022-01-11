import { DateTime, Duration } from "luxon";
// import DayCellColumn, { IDayCellItem, IDayCellEvent } from './day';
// import type { ITaskNode, ITaskEvent } from './event';
// import type { IWeekRow } from './week';

export interface ITaskNode {
  id: string,
  project_id: string,
  title: string,
  startTime: DateTime,
  endTime: DateTime,
}

export interface IDayCellItem {
  isSelected: boolean,
  // isToday: boolean,
  // inMonth: boolean,
  date: DateTime,
  events: Array<ITaskNode>,
}

export type IWeekRow = Array<IDayCellItem>

export const generateWeekRowObj = (
  inViewDate: DateTime,
  startDate: DateTime, endDate: DateTime,
  taskList: Array<ITaskNode>,
): Array<IWeekRow> => {
  const today: DateTime = DateTime.now();
  const currentDate: DateTime = inViewDate;
  const weekRowArr: Array<IWeekRow> = [];

  let canlender_startDate = startDate;
  // console.log(canlender_startDate.weekday)
  if (canlender_startDate.weekday !== 1) {
    canlender_startDate = canlender_startDate.minus({
      days: startDate.weekday - 1
    });
  }
  let canlender_endDate = endDate;
  if (canlender_endDate.weekday !== 7) {
    canlender_endDate = canlender_endDate.plus({
      days: 7 - endDate.weekday
    });
    console.log(canlender_endDate.toISODate());
  }
  const daydiff: Duration = canlender_endDate.diff(canlender_startDate, 'days');

  let gened: Array<IDayCellItem> = [];
  for (let index = 0; index <= daydiff.days; index++) {

    const genDay: DateTime = (canlender_startDate).plus({ days: index });
    // console.log(genDay.toISO())

    const events: Array<ITaskNode> = taskList.filter((task: ITaskNode) =>
      task.startTime.valueOf() <= genDay.valueOf() &&
      task.endTime.valueOf() >= genDay.valueOf()
    );
    const DayCell: IDayCellItem = {
      isSelected: false,
      date: genDay,
      events,
    }
    gened.push(DayCell);
    // console.log(gened);
    if (DayCell.date.weekday === 7 ) {
      weekRowArr.push(gened as IWeekRow);
      gened = [];
    }
  }
  return weekRowArr;
}