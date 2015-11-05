var _ = require('lodash');

function Generation(population, breeder, problem) {
    this.population = population || [];
    this.breeder = breeder;
    this.problem = problem;
}

Generation.prototype = Object.create(Object.prototype);
Generation.constructor = Generation;

Generation.prototype.run = function () {
    var newPopulation = this.population
        .map(function (individual) {
            //calculateFitness
            individual.fitness = this.problem.calculateFitness(individual);
            return individual;
        }, this)
        .map(this.breeder.breed, this.breeder);
    return new Generation(newPopulation, this.breeder, this.problem);
};

Generation.prototype.selectBestIndividual = function () {
    return _(this.population)
        .sortByOrder('fitness', 'desc')
        .first();
};

module.exports = Generation;
