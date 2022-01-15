import { derived, readable, writable } from 'svelte/store';
import { DateTime } from "luxon";
import type { ITaskNode } from '$libs/calender-utils';


export const createTaskList = (initValue: Array<ITaskNode>) => {

  const { subscribe, set, update } = writable(initValue);
  let inViewDate: DateTime = DateTime.now();
  let inViewEvent: ITaskNode = null;
  
  return {
    subscribe,
    // increment: () => update(n => n + 1),
    // decrement: () => update(n => n - 1),
    // reset: () => set(initValue)
  };
}