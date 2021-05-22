'use strict'

const isMultiple = (num, base) => {
  return (num > base) && (num % base === 0)
}

test('12 is multiple of 3', () => {
  expect(isMultiple(12, 3)).toBe(true);
})

test('The string \"12\" is multiple of 3', () => {
  expect(isMultiple("12", 3)).toBe(true);
})

test('The string \"apple\" is not a multiple of 3', () => {
  expect(isMultiple("apple", 3)).toBe(false);
})