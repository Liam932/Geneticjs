import orderBy from "lodash/orderBy";
import uuid from "uuid/v4";
import attributes from "./attributes";

export const initAttribute = attribute => {
  if (!attribute.type) return null;
  if (!attributes[attribute.type]) return null;
  return attributes[attribute.type].initAttribute(attribute);
};

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
export const calculateFitnessOfIndividual = problem => ind => {
  return { ...ind, fitness: problem(ind) };
};

export const createInitialPopulation = ({ size, schema }) => {
  return new Array(size).fill().map(createIndividual(schema));
};

export const bestIndividual = population => () =>
  orderBy(population, ["fitness"], ["desc"])[0];
