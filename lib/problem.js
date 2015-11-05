function Problem(f) {
    this.fitnessFunction = f;
}

Problem.prototype = Object.create(Object.prototype);
Problem.constructor = Problem;

Problem.prototype.calculateFitness = function(individual) {
    return this.fitnessFunction(individual.chromosone);
};

module.exports = Problem;