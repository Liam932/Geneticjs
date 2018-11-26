import { createEvolutionPipeline } from "./pipeline";
import { createInitialPopulation } from "./population";
import { calculateFitnessOfIndividual } from "./individual";

export default {
  createInitialPopulation,
  createEvolutionPipeline,
  calculateFitnessOfIndividual
};

export { createInitialPopulation };

export { createEvolutionPipeline };

export { calculateFitnessOfIndividual };
