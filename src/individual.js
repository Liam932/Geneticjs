import { initAttribute } from "./attributes";
import uuid from "uuid/v4";

const createRawIndividual = schema => {
  const id = uuid();
  return Object.keys(schema).reduce(
    (acc, item) => {
      acc[item] = initAttribute(schema[item]);
      return acc;
    },
    { id }
  );
};

export const createIndividual = schema => () => {
  const individual = createRawIndividual(schema);
  return Object.keys(schema).reduce((acc, key) => {
    acc[key].setRandomValue();
    return acc;
  }, individual);
};

export const individualToChromosome = schema => ind => {
  return Object.keys(schema).reduce((acc, key) => {
    return acc + ind[key].toBinary();
  }, "");
};

export const chromosomeToIndividual = ({ schema, chromosome }) => {
  const rawInd = createRawIndividual(schema);
  const { ind } = Object.keys(schema).reduce(
    ({ remaining, ind }, key) => {
      const representationLength = ind[key].representationLength();
      const gene = remaining.slice(0, representationLength);
      ind[key].setValueFromBinary(gene);
      return {
        ind,
        remaining: remaining.slice(representationLength)
      };
    },
    {
      remaining: chromosome,
      ind: rawInd
    }
  );
  return ind;
};

export const calculateFitnessOfIndividual = problem => ind => {
  return { ...ind, fitness: problem(ind) };
};
