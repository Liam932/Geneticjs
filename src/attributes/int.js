import random from "lodash/random";

const toBinary = n => Number(n).toString(2);
const fromBinary = n => parseInt(n, 2);

export default {
  initAttribute(attribute) {
    return random(attribute.min, attribute.max);
  },
  toBinary,
  fromBinary
};
