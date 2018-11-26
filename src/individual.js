import {
  initAttribute,
  attributeToBinary,
  attributefromBinary
} from "./attributes";
import uuid from "uuid/v4";

export const createIndividual = schema => () => {
  const id = uuid();

  return Object.keys(schema).reduce(
    (acc, item) => {
      acc[item] = initAttribute(schema[item]);
      return acc;
    },
    { id }
  );
};

// Not the way to do it!!
// The schema needs more information about the binary representation or the attributes.
// Maybe the attributes need to be instances themselves?

export const individualToChromosome = schema => ind => {
  return Object.keys(schema).reduce(
    (acc, key) => {
      const binaryValue = attributeToBinary(schema[key], ind[key]);
      return {
        attributes: {
          ...acc.attributes,
          [key]: binaryValue
        },
        representation: acc.representation + binaryValue,
        id: ind.id
      };
    },
    { representation: "", attributes: {}, id: ind.id }
  );
};

export const chromosomeToIndividual = schema => ({ attributes, id } = {}) => {
  return Object.keys(schema).reduce(
    (acc, key) => {
      acc[key] = attributefromBinary(schema[key], attributes[key]);
      return acc;
    },
    { id }
  );
};

export const calculateFitnessOfIndividual = problem => ind => {
  return { ...ind, fitness: problem(ind) };
};
