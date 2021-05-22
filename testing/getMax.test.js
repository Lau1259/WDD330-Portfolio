'use strict'

const getMax = (numbers) => {
  return numbers.reduce((c, a) => {
    return c > a ? c : a
  })
}

// Only Positive integers
let numbers1 = [1, 25, 38, 12, 9, 6, 42, 85, 84, 21];


//Integers
let numbers2 = [-91, 25, 138, 12, 9, 685, 420, 185, 804, 21];

//All negative numbers
let numbers3 = [-91, -25, -138, -12, -9, -685, -420, -185, -804, -21];

//Text

let text1 = ["apple","b","c","d","e","F","A","Z"];

test('85 is the largest number in the following array: [1,25,38,12,9,6,42,85,84,21]', () => {
  expect(getMax(numbers1)).toBe(85);
});

test(`804 is the largest number in the following array: ${numbers2}`, () => {
  expect(getMax(numbers2)).toBe(804);
});

test(`-9 is the largest number in the following array: ${numbers3}`, () => {
  expect(getMax(numbers3)).toBe(-9);
});

test(`e is the max letter in the following array: ${text1}`, () => {
  expect(getMax(text1)).toBe("e");
});