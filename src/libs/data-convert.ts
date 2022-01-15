import { pascal, kebab } from 'case';
import { DateTime } from 'luxon';
import d from 'typescript-is';

export function convertToType<T>(income: any): T {
  const income_field = Object.keys(income);
  console.log({ income, income_field });
  const converted: T = {} as T;

  try {
    for (const key of income_field) {
      // todo : date handler
      if (/[\d]+-[\d]+-[\d]+T[\d]+:[\d]+:[\d]+/gi.test(income[key])) {
        converted[pascal(key)] = DateTime.fromISO(income[key]);
      } else {
        converted[pascal(key)] = income[key];
      }
    }
  } catch (e) {
    if (e instanceof TypeError) {
      console.warn(e);
    }
    throw e;
  }

  return converted;
}

export function convertToDataJson<T>(income: T): any {
  const income_field = Object.keys(income);
  const converted: any = {};
  try {
    for (const key in income_field) {
      converted[kebab(key)] = income[key];
      if (income[key] instanceof DateTime) {
        converted[kebab(key)] = (income[key] as DateTime).toISO();
      }
    }
  } catch (e) {
    if (e instanceof TypeError) {
      console.warn(e);
    }
    throw e;
  }
  return converted;

}