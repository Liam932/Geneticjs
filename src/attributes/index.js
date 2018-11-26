import int from "./int";
// import float from "./float";

export const supportedAttributes = {
  int
};

const isSupported = type => !!supportedAttributes[type];

export const initAttribute = (attribute = {}) => {
  const { type } = attribute;
  if (!type || !isSupported(type)) return null;
  return supportedAttributes[type].initAttribute(attribute);
};

export const attributeToBinary = (attribute = {}, val) => {
  const { type } = attribute;
  if (!type || !isSupported(type)) return null;
  return supportedAttributes[type].toBinary(val);
};

export const attributeFromBinary = (attribute = {}, val) => {
  const { type } = attribute;
  if (!type || !isSupported(type)) return null;
  return supportedAttributes[type].fromBinary(val);
};
