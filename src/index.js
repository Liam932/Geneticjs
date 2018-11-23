import { createEvolutionPipeline } from "./pipeline";
import {
  createInitialPopulation,
  calculateFitnessOfIndividual
} from "./population";

export default {
  createInitialPopulation,
  createEvolutionPipeline,
  calculateFitnessOfIndividual
};

export { createInitialPopulation };

export { createEvolutionPipeline };

export { calculateFitnessOfIndividual };
