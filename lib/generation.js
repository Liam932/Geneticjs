var _ = require('lodash');

function Generation(population) {
    this.population = population || [];
}

Generation.prototype = Object.create(Object.prototype);
Generation.constructor = Generation;

Generation.prototype.run = function () {
    var newPopulation = _(this.population).forEach(function (individual) {
        //calculateFitness
        individual.fitness = 1;
    }).map(function (ind) {
        //breed
        return ind
    }).value();
    return new Generation(newPopulation);
};

module.exports = Generation;
