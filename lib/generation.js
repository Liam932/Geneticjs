var _ = require('lodash');
var async = require('async');

function Generation(population, breeder, mutator, problem, elites) {
    this.population = population || [];
    this.breeder = breeder;
    this.mutator = mutator;
    this.problem = problem;
    this.elites = elites;
}

Generation.prototype = Object.create(Object.prototype);

Generation.prototype.run = function (callback) {
    this.calculateFitness((err) => {
        if (err) {
            return callback(err);
        }
        var newPopulation = this.population
            .slice(0, -this.elites)
            .map(this.breeder.breed, this.breeder)
            .map((ind) => {
                if (this.mutator) {
                    return this.mutator.mutate.call(this.mutator, ind);
                } else {
                    return ind;
                }
            });

        if (this.elites) {
            for (var i = 0; i < this.elites; i++) {
                newPopulation.push(this.selectBestIndividual());
            }
        }
        var newGen = new Generation(newPopulation, this.breeder, this.mutator, this.problem, this.elites);
        return callback(null, newGen);
    });

};

Generation.prototype.calculateFitness = function (callback) {
    async.each(this.population, (individual, callback) => {
        this.problem.calculateFitness(individual, (err, fitness) => {
            if (err) {
                callback(err);
            }
            individual.fitness = fitness;
            callback();
        });
    }, callback);
};

Generation.prototype.selectBestIndividual = function () {
    return _(this.population)
        .sortByOrder('fitness', 'desc')
        .first();
};

module.exports = Generation;
