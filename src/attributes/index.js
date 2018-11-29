import int from "./int";
// import float from "./float";

export const supportedAttributes = {
  int
};

const isSupported = type => !!supportedAttributes[type];

export const initAttribute = (attribute = {}) => {
  const { type } = attribute;
  if (!type || !isSupported(type)) return null;
  return new supportedAttributes[type](attribute);
};
