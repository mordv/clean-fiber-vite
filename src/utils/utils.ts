import { isEqual } from 'lodash';

export const sum = (numbers: Iterable<number>): number => {
  let res = 0;
  for (const number of numbers) {
    res += number;
  }
  return res;
};

export const avg = (numbers: number[]): number => {
  const s = sum(numbers);
  return numbers.length ? s / numbers.length : 0;
};

export const intRange = (length: number): number[] => Array.from({ length }).map((_, idx) => idx);

export const range = (start: number, end: number, step: number): number[] => {
  const res = [];
  while (start <= end) {
    res.push(start);
    start += step;
  }
  return res;
};

export const findMin = (array: number[]): [number, number] =>
  array.reduce((acc, current, index) => (current < acc[0] ? [current, index] : acc), [Number.MAX_VALUE, 0]);

/**
 *
 * @param probability to stay in percent
 */
export const randomFilter =
  <T>(probability: number): ((val: T) => boolean) =>
  () =>
    Math.random() < probability / 100;

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomElement = <T>(array: T[]): T => array[getRandomInt(0, array.length - 1)];

export const isEqualToOneOf = (value: unknown, compareTo: unknown[]): boolean =>
  compareTo.some((v) => isEqual(v, value));
