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

export const mapRange = (x: number, [a1, a2]: [number, number], [b1, b2]: [number, number]): number =>
  b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);
