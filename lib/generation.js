var _ = require('lodash');

function Generation(population, breeder) {
    this.population = population || [];
    this.breeder = breeder;
}

Generation.prototype = Object.create(Object.prototype);
Generation.constructor = Generation;

Generation.prototype.run = function () {
    var newPopulation = this.population
        .map(function (individual) {
            //calculateFitness
            individual.fitness = 1;
            return individual;
        })
        .map(this.breeder.breed, this.breeder);
    return new Generation(newPopulation, this.breeder);
};

module.exports = Generation;
