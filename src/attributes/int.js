import random from "lodash/random";

export default class IntAttribute {
  constructor(schema) {
    this.schema = schema;
    this.padLength = Number(schema.max).toString(2).length;
  }

  isValid(val) {
    return val > this.schema.min && val < this.schema.min;
  }

  setRandomValue() {
    this.value = Number(random(this.schema.min, this.schema.max));
  }

  representationLength() {
    return this.padLength;
  }

  toBinary() {
    return this.value.toString(2).padStart(this.padLength, "0");
  }

  setValueFromBinary(string) {
    const val = Number(parseInt(string, 2));
    if (this.isValid(val)) {
      this.value = Number(parseInt(string, 2));
    } else {
      this.setRandomValue();
    }
  }
}
