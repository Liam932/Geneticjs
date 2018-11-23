import selectors from "./selectors";
import { initAttribute } from "./population";
import uuid from "uuid/v4";

const selectIndividuals = ({ population, selection = [] }) => {
  return selection.map(({ type }) => selectors[type](population));
};

const mutate = ({ individual, schema, mutationRate }) => {
  if (!mutationRate) return individual;
  return Object.keys(individual).reduce((ind, key) => {
    const prob = Math.random();
    if (prob < mutationRate) {
      individual[key] = initAttribute(schema[key]);
      return individual;
    } else {
      return individual;
    }
  }, individual);
};

const combine = ({ individuals = [], combination }) =>
  combination(...individuals);

export const createEvolutionPipeline = ({
  selection = [],
  combination,
  mutationRate = 0.05,
  schema
} = {}) => async ({ population }) => {
  const individuals = selectIndividuals({ population, selection });
  const newIndividual = combine({ individuals, combination, schema });
  const mutated = mutate({ individual: newIndividual, mutationRate, schema });
  mutated.id = uuid();
  return mutated;
};

export const nextIteration = pipeline => async population => {
  return await Promise.all(
    new Array(population.length).fill().map(() => pipeline({ population }))
  );
};
