import orderBy from "lodash/orderBy";
import { createIndividual } from "./individual";

export const calculateFitnessOfIndividual = problem => ind => {
  return { ...ind, fitness: problem(ind) };
};

export const createInitialPopulation = ({ size, schema }) => {
  return new Array(size).fill().map(createIndividual(schema));
};

export const bestIndividual = population => () =>
  orderBy(population, ["fitness"], ["desc"])[0];
