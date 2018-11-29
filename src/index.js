import { createEvolutionPipeline } from "./pipeline";
import { createInitialPopulation, bestIndividual } from "./population";
import { calculateFitnessOfIndividual } from "./individual";

export default {
  createInitialPopulation,
  createEvolutionPipeline,
  calculateFitnessOfIndividual,
  bestIndividual
};

export { createInitialPopulation };

export { createEvolutionPipeline };

export { calculateFitnessOfIndividual };

export { bestIndividual };
