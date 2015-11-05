var _ = require('lodash');

function Generation(population, breeder, mutator, problem, elites) {
    this.population = population || [];
    this.breeder = breeder;
    this.mutator = mutator;
    this.problem = problem;
    this.elites = elites;
}

Generation.prototype = Object.create(Object.prototype);

Generation.constructor = Generation;

Generation.prototype.run = function () {
    this.calculateFitness();
    //console.log('Best individual: ',this.selectBestIndividual().chromosone);
    var newPopulation = this.population
        .slice(0, -this.elites)
        .map(this.breeder.breed, this.breeder)
        .map(this.mutator.mutate, this.mutator);

    if(this.elites) {
        for(var i=0; i < this.elites; i++) {
            newPopulation.push(this.selectBestIndividual());
        }
    }
    return new Generation(newPopulation, this.breeder, this.mutator, this.problem, this.elites);
};

Generation.prototype.calculateFitness = function() {
    this.population.forEach(function(individual) {
        individual.fitness = this.problem.calculateFitness(individual);
    }.bind(this));
    return this;
};

Generation.prototype.selectBestIndividual = function () {
    return _(this.population)
        .sortByOrder('fitness', 'desc')
        .first();
};

module.exports = Generation;
