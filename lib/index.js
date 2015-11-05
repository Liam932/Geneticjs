var Generation = require('./generation');
var Individual = require('./individual');
var Breeder = require('./breeder');
var Problem = require('./problem');
var _ = require('lodash');

function Evolve() {
}

Evolve.prototype = Object.create(Object.prototype);
Evolve.constructor = Evolve;


Evolve.prototype.setConfig = function (options) {
    this.generations = options.generations || 1000;
    this.populationSize = options.populationSize || 30;
    this.elites = options.elites || 1;
    this.mutationRate = options.mutationRate || 0.05;

    this.setBreedingPipeline(options.breeding);
    return this;
};

Evolve.prototype.setBreedingPipeline = function (options) {
    this.breeder = new Breeder(options);
};

Evolve.prototype.setIndividual = function (schema) {
    this.individualSchema = schema;
    return this;
};

Evolve.prototype.setProblem = function (problem) {
    this.problem = new Problem(problem);
    return this;
};

Evolve.prototype.initPopulation = function () {
    return _.times(this.populationSize, function () {
        return new Individual(this.individualSchema);
    }, this);
};

Evolve.prototype.run = function () {
    this.generation = new Generation(this.initPopulation(), this.breeder, this.problem);
    for (var i = 0; i < this.generations; i++) {
        this.generation = this.generation.run();
    }
    var bestIndividual = this.generation.selectBestIndividual();
    return bestIndividual.chromosone;
};


module.exports = function () {
    return new Evolve();
};