import type { DateTime, Duration } from "luxon";
// import DayCellColumn, { IDayCellItem, IDayCellEvent } from './day';
// import type { ITaskNode, ITaskEvent } from './event';
// import type { IWeekRow } from './week';

export interface ITaskNode {
  Id: string,
  ProjectId: string,
  Title: string,
  StartTime: DateTime,
  EndTime: DateTime,
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
  }
  const daydiff: Duration = canlender_endDate.diff(canlender_startDate, 'days');

  let gened: Array<IDayCellItem> = [];
  for (let index = 0; index <= daydiff.days; index++) {

    const genDay: DateTime = (canlender_startDate).plus({ days: index });
    // console.log(genDay.toISO())

    const events: Array<ITaskNode> = taskList.filter((task: ITaskNode) =>
      task.StartTime.valueOf() <= genDay.valueOf() &&
      task.EndTime.valueOf() >= genDay.valueOf()
    );
    // console.log(events)
    const DayCell: IDayCellItem = {
      isSelected: false,
      date: genDay,
      events,
    }
    gened.push(DayCell);
    // console.log(gened);
    if (DayCell.date.weekday === 7) {
      weekRowArr.push(gened as IWeekRow);
      gened = [];
    }
  }
  return weekRowArr;
}