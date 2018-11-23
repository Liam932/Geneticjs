import random from "lodash/random";

export default {
  initAttribute(attribute) {
    return random(attribute.min, attribute.max, true);
  }
};
