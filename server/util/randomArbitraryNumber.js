// Source:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_number_between_two_values

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export default getRandomArbitrary;
