import selectors from "./selectors";
import { individualToChromosome, chromosomeToIndividual } from "./individual";

const selectIndividuals = ({ population, selection = [] }) => {
  return selection.map(({ type }) => selectors[type](population));
};

const mutate = ({ chromosome, mutationRate }) => {
  if (!mutationRate) return chromosome;
  return chromosome
    .split("")
    .map(bit => {
      const prob = Math.random();
      if (prob < mutationRate) {
        return bit ? "0" : "1";
      } else {
        return bit;
      }
    })
    .join("");
};

const combine = ({ individuals = [], schema }) => {
  //Single Point Crossover
  const [first, second] = individuals.map(individualToChromosome(schema));
  const slicePoint = Math.round(first.length / 2); //support more than single point
  return first.slice(0, slicePoint) + second.slice(slicePoint);
};

export const createEvolutionPipeline = ({
  selection = [],
  mutationRate = 0.05,
  schema
} = {}) => async ({ population }) => {
  const individuals = selectIndividuals({ population, selection });
  const chromosome = combine({ individuals, schema });
  const mutatedChromosome = mutate({
    chromosome,
    mutationRate
  });
  return chromosomeToIndividual({ schema, chromosome: mutatedChromosome });
};

export const nextIteration = pipeline => async population => {
  return await Promise.all(
    new Array(population.length).fill().map(() => pipeline({ population }))
  );
};
