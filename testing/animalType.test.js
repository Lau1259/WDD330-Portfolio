class Animal {
  constructor(name, feet, diet, hasFur, hasTail, canFly, livesOn, isPet) {
    this.name = name;
    this.feet = feet;
    this.diet = diet;
    this.hasFur = hasFur;
    this.hasTail = hasTail;
    this.canFly = canFly;
    this.livesOn = livesOn;
    this.isPet = isPet;
  }
}

let elephant = new Animal(
  'Elephant', // name
  4, // feet
  "omnivore", //diet
  false, // has fur
  true, // has tail
  false, // can fly
  "land", // lives on
  false // is a pet
);

let eagle = new Animal(
  'Eagle', // name
  2, // feet
  "carnivore", //diet
  false, // has fur
  false, // has tail
  true, // can fly
  "land", //lives on
  false // is a pet
);

let labrador = new Animal(
  'Labrador', // name
  4, // feet
  "omnivore", //diet
  true, // has fur
  true, // has tail
  false, // can fly
  "land", //lives on
  true // is a pet
);

let wolf = new Animal(
  'Wolf', // name
  4, // feet
  "omnivore", //diet
  true, // has fur
  true, // has tail
  false, // can fly
  "land", //lives on
  false // is a pet
);


const isDog = (animal) => {
  return (
    animal.feet === 4 &&
    animal.diet === "omnivore" &&
    animal.hasFur &&
    animal.tail,
    animal.canFly === false,
    animal.livesOn === "land",
    animal.isPet
  );
}

test(`A(n) ${elephant.name} is not a dog`, () => {
  expect(isDog(elephant)).toBe(false);
});

test(`A(n) ${eagle.name} is not a dog`, () => {
  expect(isDog(eagle)).toBe(false);
});

test(`A(n) ${labrador.name} is a dog`, () => {
  expect(isDog(labrador)).toBe(true);
});

test(`A(n) ${wolf.name} is not a dog`, () => {
  expect(isDog(wolf)).toBe(false);
});