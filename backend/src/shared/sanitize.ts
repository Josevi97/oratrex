export const allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const input = (input: string) => {
  return input
    .split('')
    .filter(c => allowedChars.includes(c) || c === ' ')
    .join('')
    .trim()
    .replace(/\s+/g, ' ');
}

const array = (arr: Array<unknown>): Array<unknown> => arr.map(value => fromUnknown(value));

const object = (obj: object): object => {
  const entries = Object.entries(obj);
  return Object.fromEntries(entries.map(([key, value]) => [key, fromUnknown(value)]));
}

const fromUnknown = (data: unknown) => {
  if (!data) return data;

  if (typeof data === 'string') return input(data);
  if (Array.isArray(data)) return array(data);
  if (typeof data === 'object') return object(data);

  return data;
}

const sanitize = () => {
  return {
    fromUnknown,
  }
}

export default sanitize();
