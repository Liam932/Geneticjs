import selectors from "./selectors";
import { initAttribute } from "./population";
import { individualToChromosome, chromosomeToIndividual } from "./individual";
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

const combine = ({ individuals = [], schema }) => {
  //Single Point Crossover
  const [first, second] = individuals.map(individualToChromosome(schema));
  const slicePoint = Math.round(first.length / 2); //support more than single point
  const chromosome = first.slice(0, slicePoint) + second.slice(slicePoint);
  return chromosomeToIndividual({ schema, chromosome });
};

export const createEvolutionPipeline = ({
  selection = [],
  mutationRate = 0.05,
  schema
} = {}) => async ({ population }) => {
  const individuals = selectIndividuals({ population, selection });
  const newIndividual = combine({ individuals, schema });
  // const mutated = mutate({ individual: newIndividual, mutationRate, schema });
  const mutated = newIndividual;
  mutated.id = uuid();
  return mutated;
};

export const nextIteration = pipeline => async population => {
  return await Promise.all(
    new Array(population.length).fill().map(() => pipeline({ population }))
  );
};
